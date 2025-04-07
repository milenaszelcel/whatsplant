// config-overrides.js (Improved Rule Finding)
const { override, addBabelPreset, addBabelPlugin } = require("customize-cra");
const path = require("path");
const fs = require("fs");

// --- Determine the REAL path to your contract package source ---
// Ensure this path correctly points to the root of your 'contract' package
const contractPackagePath = path.resolve(__dirname, "../contract");
// ---

// Helper function to find the relevant babel-loader rule more reliably
const findBabelLoaderRule = (rules) => {
  for (const rule of rules) {
    if (rule.oneOf) {
      // Search within oneOf array
      const found = rule.oneOf.find(
        (loaderRule) =>
          loaderRule.loader && loaderRule.loader.includes("babel-loader")
      );
      if (found) return found;
    } else if (rule.loader && rule.loader.includes("babel-loader")) {
      // Check if the rule itself is babel-loader
      return rule;
    } else if (Array.isArray(rule.use)) {
      // Check if babel-loader is within a 'use' array
      const found = rule.use.find(
        (loaderConfig) =>
          typeof loaderConfig === "object" &&
          loaderConfig.loader &&
          loaderConfig.loader.includes("babel-loader")
      );
      if (found) return rule; // Return the whole rule object which might contain the include/exclude
    }
  }
  return null;
};

module.exports = override(
  // 1. Manually modify the Webpack config first
  (config) => {
    console.log("--- Applying config-overrides (Improved Rule Finding) ---");

    // Find the babel-loader rule using the improved helper
    const babelLoaderRule = findBabelLoaderRule(config.module.rules);

    if (babelLoaderRule) {
      console.log("+++ Found babel-loader rule +++");
      // Determine where the 'include' property is (might be directly on the rule or in options)
      let options = babelLoaderRule.options || {}; // Get options if they exist
      let includeArray = babelLoaderRule.include // Prefer include on the rule itself
        ? Array.isArray(babelLoaderRule.include)
          ? babelLoaderRule.include
          : [babelLoaderRule.include]
        : options.include
        ? Array.isArray(options.include)
          ? options.include
          : [options.include]
        : []; // Fallback to options.include

      // If no include array found, default to appSrc (might need adjustment)
      if (includeArray.length === 0 && process.env.REACT_APP_SRC) {
        console.log(
          "--- No existing include found, defaulting based on REACT_APP_SRC ---"
        );
        includeArray = [process.env.REACT_APP_SRC];
      } else if (includeArray.length === 0) {
        console.warn("--- Could not determine default include path ---");
        // Fallback: include the frontend src directory explicitly if possible
        const frontendSrcPath = path.resolve(__dirname, "src");
        if (fs.existsSync(frontendSrcPath)) {
          includeArray = [frontendSrcPath];
          console.log(`--- Using default include path: ${frontendSrcPath} ---`);
        }
      }

      const contractSrcPath = path.resolve(contractPackagePath); // Target the src dir within contract

      // Add the contract source path to the include array if not already present
      if (!includeArray.includes(contractSrcPath)) {
        console.log(
          `+++ Adding ${contractSrcPath} to babel-loader includes +++`
        );
        includeArray.push(contractSrcPath);
      }

      // Re-assign the potentially modified include array back to the rule/options
      // Prefer setting it on the rule directly if it was found there initially
      if (babelLoaderRule.include) {
        babelLoaderRule.include = includeArray;
      } else {
        // If include was not directly on the rule, set it in options
        if (!babelLoaderRule.options) babelLoaderRule.options = {};
        babelLoaderRule.options.include = includeArray;
      }

      // Optional: Log the final state of the rule for verification
      console.log(
        "Final babel-loader rule (or part containing options/include):",
        JSON.stringify(babelLoaderRule, null, 2)
      );
    } else {
      console.error(
        "!!! Could not find babel-loader rule using improved logic !!!"
      );
      // --- DEBUGGING: Log the entire rules structure if the rule isn't found ---
      // Uncomment the next line to see the full structure and manually identify the rule
      // console.log("Full config.module.rules structure:", JSON.stringify(config.module.rules, null, 2));
      // ---
    }
    return config;
  },

  // 2. Ensure the necessary presets/plugins are still applied by customize-cra
  //    These will be applied *after* our manual modification
  addBabelPreset("@babel/preset-typescript"),
  addBabelPlugin("@emotion/babel-plugin") // Keep only if needed
);
