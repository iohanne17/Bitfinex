import React, { Fragment, useRef, useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, Pressable, Modal, TextInput } from "react-native";
import _ from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ModalComponent({
    visible,
    options = [],
    onSelect,
    onClose
}) {


   const listItemTitleStyle = {
        fontSize: 14,
        color: "black"
    }

    const listItemStyle = {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 2
    }
   
    return (
      <Modal
        visible={visible}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
        animationType={"slide"}
        presentationStyle={"formSheet"}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginBottom: 10,
                    paddingVertical: 25,
                    justifyContent:"flex-end",
                    marginHorizontal: -16,

                  }}
                >
                  <Pressable onPress={() => onClose && onClose()}>
                    <MaterialCommunityIcons name={"chevron-down"} size={28} />
                  </Pressable>
                </View>
              );
            }}
            data={options}
            extraData={options}
            style={{ paddingHorizontal: 16 }}
            keyExtractor={(item) => `${item}`}
            renderItem={({ item, index, separators }) => (
              <Pressable
                onPress={() => onSelect(item)}
                style={listItemStyle}
                key={index}
              >
                <Text style={listItemTitleStyle}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    );
}

export default function Component({
    styles = {},
    options = [],
    onSelected,
    closeModal,
    visible,
    ...props
}) {

    return (
            <ModalComponent
                visible={visible}
                options={options}
                onClose={closeModal}
                onSelect={onSelected}
            />
    );
}
