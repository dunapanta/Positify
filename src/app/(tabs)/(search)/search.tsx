import { View, Text, StatusBar } from 'react-native'

import { COLORS } from '@/src/constants'

const Search = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />
            <Text>Search</Text>
        </View>
    )
}

export default Search
