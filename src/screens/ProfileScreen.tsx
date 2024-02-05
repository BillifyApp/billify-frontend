import {Text, View} from "react-native";
import React, {useCallback, useState} from "react";
import {settingsName, splitAmountScreen} from "../stores/route_names";
import CustomButton from "../components/atom/CustomButton";
import {useAuth} from "../context/AuthContext";
import {styles} from "../styles/styles";
import CustomText from "../components/atom/CustomText";
import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {url} from "../stores/constants";


export default function ProfileScreen({navigation}: any) {
    const {onLogout} = useAuth();
    const {authState} = useAuth();
    const [receipt, setReceipt] = useState({
        "image": {
            "path": "uploads/bills/image_1705766172424.jpeg",
            "date_uploaded": "2024-01-20T15:57:33.322Z"
        },
        "currency": "EUR",
        "_id": "65abed6dd11e01fd16267d35",
        "user_id": "65776dca0b07c6e8dc90f670",
        "date_created": "2024-01-20T15:57:33.322Z",
        "date_payed": "2023-05-11T00:00:00.000Z",
        "comp_name": "SPAR",
        "address": "Bahnhofplatz 3-6, 4020 Linz",
        "items": [
            {
                "quantity": 1,
                "itemName": "MAKI AVOCADO 102G",
                "unitPrice": 4.99,
                "subtotal": 4.99
            },
            {
                "quantity": 1,
                "itemName": "WALDQUELLE WALDBEER",
                "unitPrice": 1.19,
                "subtotal": 1.19
            },
            {
                "quantity": 1,
                "itemName": "VEGGIE VEG.PIKANTE E",
                "unitPrice": 1.59,
                "subtotal": 1.59
            },
            {
                "quantity": 1,
                "itemName": "DIEOHNE ALMSCHEIBE W",
                "unitPrice": 2.49,
                "subtotal": 2.49
            },
            {
                "quantity": 1,
                "itemName": "VEGGIE AUFSTR,TOM/BA",
                "unitPrice": 1.79,
                "subtotal": 1.79
            },
            {
                "quantity": 1,
                "itemName": "MAKAVA ICE TEA 0,33L",
                "unitPrice": 1.59,
                "subtotal": 1.59
            },
            {
                "quantity": 1,
                "itemName": "SPAR LAUGENSTANGE",
                "unitPrice": 0.99,
                "subtotal": 0.99
            },
            {
                "quantity": 1,
                "itemName": "SPAR DINKEL-BUCH.WE.",
                "unitPrice": 1.19,
                "subtotal": 1.19
            },
            {
                "quantity": 2,
                "itemName": "S-BUDGET SEMMEL 60G",
                "unitPrice": 0.19,
                "subtotal": 0.38
            }
        ],
        "total": 16.2,
        "category_id": "groceries",
        "__v": 0
    });

    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            alert(result.msg);
        }
    };


    async function getReceipt() {
        return await axios
            .post(`${url}/receipts/65abed6dd11e01fd16267d35`, {
                user_id: authState?.id,
            })
            .then((res) => {
                setReceipt(res.data[0]);
            });
    }


    useFocusEffect(
        useCallback(() => {
            getReceipt()
            console.log("profile pressed")
        }, [])
    );

    return (
        <View style={{backgroundColor: "#fff", height: "100%"}}>
            <CustomText
                style={[
                    styles.h1,
                    {marginHorizontal: 15, marginTop: 20, marginBottom: 10},
                ]}
            >
                My Profile
            </CustomText>
            <CustomButton
                title="Go to Settings"
                onPress={() => navigation.navigate(settingsName)}
            />
            <CustomButton title="Logout" onPress={logout}/>
        </View>
    );
}
