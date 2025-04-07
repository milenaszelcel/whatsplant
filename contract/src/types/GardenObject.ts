export type GardenObject = {
  _id: string;
  userId: string;
  name: string;
  type: string;
  plants: [
    {
      plantId: {
        type: number;
      };
      waterValue: {
        type: number;
      };
    },
  ];
};
