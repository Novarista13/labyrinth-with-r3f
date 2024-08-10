import { View } from "@react-three/drei";
import Interface from "../../Interface";

const MainPanel = ({ children }) => {
  return (
    <div
      className="panel"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </View>
      <Interface />
    </div>
  );
};

export default MainPanel;
