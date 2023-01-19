import React from "react"
import { ActivityIndicator, View } from "react-native"

import { styles } from "./styles"

export function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#7C3AED" />
        </View>
    )
}
