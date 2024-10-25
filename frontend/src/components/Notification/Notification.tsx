import { MaterialIcon } from "material-icons";

type Props = {
  icon: MaterialIcon;
  title: string;
  text: string;
};

export const Notification = ({ icon, title, text }: Props) => {
  return (
    <div>
      <div>{icon}</div>
      <div>{title}</div>
      <div>{text}</div>
    </div>
  );
};
