// import React from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";
// import { useTheme } from "../../../Providers/ThemeProvider";

// const ChartExample = () => {
//   const theme = useTheme();
//   const deviceWidth = Dimensions.get("window").width;


//   const today = new Date();
//   const labels = [
//     today.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
//   ];

//   for (let i = 1; i <= 4; i++) {
//     const date = new Date();
//     date.setDate(today.getDate() - i);
//     labels.unshift(
//       date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
//     );
//   }

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         data: [20, 45, 28, 80, 80],
//         color: () => theme.background,
//         strokeWidth: 6,
//       },
//     ],
//   };

//   const chartConfig = {
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientToOpacity: 0,
//     backgroundColor: "#f1c40f",
//     backgroundGradientFrom: theme.text,
//     backgroundGradientTo: theme.text,
//     decimalPlaces: 0,
//     color: () => "#666666",
//     labelColor: theme.text,
//     style: {
//       borderRadius: 16,
//       strokeWidth: 2,
//     },
//     propsForDots: {
//       r: "6",
//       strokeWidth: "4",
//       stroke: "#f1c40f",
//     },
//   };

//   return (
//     <View style={styles.container}>
//       {/* <LineChart
//         data={data}
//         width={deviceWidth}
//         height={300}
//         chartConfig={chartConfig}
//         bezier
//         style={styles.chart}
//         onDataPointClick={() => {}}
//         withVerticalLines={false}
//         withHorizontalLines={false}
//         withDots={true}
//         withOuterLines={false}
//         dotRadius={24}
//       /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 48,
//   },
//   chart: {
//     marginVertical: 8,
//   },
// });

// export default ChartExample;
