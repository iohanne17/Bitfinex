import React, { Fragment, useContext, useState, useEffect } from "react";
import {
  Button,
  Text,
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchBookingQuery,
  useFetchPairsQuery,
  mainSliceApi,
} from "../../features/main/main-api-slice";
import SelectField from "../../component/choice";
import { SocketContext } from "../../providers/socket";

const CURRENCY = [
  {
    name: "ALL",
  },
  {
    name: "USD",
  },
  {
    name: "EUR",
  },
  {
    name: "GBP",
  },
  {
    name: "JPY",
  },
  {
    name: "BTC",
  },
  {
    name: "ETH",
  },
  {
    name: "USDT",
  },
  {
    name: "CNHT",
  },
  {
    name: "EURT",
  },
  {
    name: "XAUT",
  },
  {
    name: "MIM",
  },
  {
    name: "MXNT",
  },
];

export default function App({ navigation }) {
  const [selected, setselected] = useState(CURRENCY[0].name);
  const { ws} = useContext(SocketContext);
  const { data, isFetching } = useFetchPairsQuery(selected);
  const [socketData, setsocketData] = useState("1INCH/USD");
  const { data: bookData, isFetching: isFetchingBook } = useFetchBookingQuery(socketData);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState(undefined);
  const [filteredOptions, setFilteredOptions] = useState([]);
  


  const closeModal = () => {
    setVisible(false);
  };

  const onSelect = (item) => {
    setLabel(item);
    console.log("selected item--->", item);
    setsocketData(item);
    sendReq(item);
    setVisible(false)
  };

  useEffect(() => {
    if(bookData){
      setFilteredOptions(bookData)
    }
  }, [bookData]);

  const sendReq = (pair) => {
    let msg = JSON.stringify({
      event: "subscribe",
      channel: "book",
      symbol: `t${pair}`,
    });

    ws.send(msg);
  };

  const onSelectFilter = (item)=> {
    setselected(item)
    const filtered = data[0].filter((el)=> {
      if(item === "ALL") return el
          return el.includes(item)
    });
    setFilteredOptions(filtered);
  }

  if (isFetchingBook) {
    return (
      <SafeAreaView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={"green"} size={"large"} />
        </View>
      </SafeAreaView>
    );
  }


  console.log("i am the data in pairs----->",);

  return (
    <Fragment>
      <View style={styles.container}>
        <Text>Select Currency</Text>
        <View style={styles.pillWrapper}>
          {CURRENCY.map((elem, idx) => {
            const isSelected = elem.name === selected;
            return (
              <Pressable
                onPress={()=> onSelectFilter(elem.name)}
                style={[
                  styles.pill,
                  { borderColor: isSelected ? "green" : "black" },
                ]}
              >
                <Text>{elem.name}</Text>
              </Pressable>
            );
          })}
        </View>
        <Pressable style={styles.containerStyle} onPress={() => setVisible(true)}>
          <Text style={styles.labelStyle}>{label || data[0][0]}</Text>
        </Pressable>
        <SelectField
          options={filteredOptions}
          visible={visible}
          closeModal={closeModal}
          onSelected={onSelect}
        />
        <FlatList
          data={bookData}
          ListHeaderComponent={() => {
            return (
              <View style={styles.listItemStyle}>
                <Text style={styles.listItemTitleStyle}>{"Amount"}</Text>
                <Text style={styles.listItemTitleStyle}>{"Total"}</Text>
                <Text style={styles.listItemTitleStyle}>{"Price"}</Text>
              </View>
            );
          }}
          extraData={bookData}
          style={{ paddingHorizontal: 8, marginTop: 12 }}
          keyExtractor={(item) => `${item}---`}
          renderItem={({ item, index, separators }) => (
            <Pressable style={styles.listItemStyle} key={index}>
              <Text style={styles.listItemTitleStyle}>{item[0]}</Text>
              <Text style={styles.listItemTitleStyle}>{item[1]}</Text>
              <Text style={styles.listItemTitleStyle}>{item[2]}</Text>
            </Pressable>
          )}
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  pillText: {
    fontWeight: "bold",
    fontSize: 18,
    texTransform: "uppercase",
  },
  pill: {
    borderRadius: 25,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 4,
    marginVertical: 4,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  pillWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
  listItemTitleStyle: {
    fontSize: 14,
    color: "black",
  },

  listItemStyle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
   
  containerStyle : {
    width: "100%",
    position: "relative",
    minHeight: 48,
    marginTop: 15,
    borderWidth: 1, 
    borderColor: "blue",
    justifyContent: "center",
    paddingLeft: 10
},

labelStyle: {
    textTransform: "uppercase",
    color: "black",
    fontSize: 14,
    letterSpacing: 0.5,
    zIndex: 10,
    backgroundColor:"white",
    width: "100%",
    fontWeight: "600"
}

});
