import { View } from "@react-three/drei";

const SidePanel = ({ children }) => {
  return (
    <div
      className="panel"
      style={{
        position: "fixed",
        width: 200,
        height: 200,
        top: 5,
        right: 5,
        border: "3px solid limegreen",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "101%",
          height: "101%",
        }}
      >
        {children}
      </View>
    </div>
  );
};

export default SidePanel;
