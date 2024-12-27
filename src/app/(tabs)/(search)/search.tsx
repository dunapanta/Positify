import { View, Text, StatusBar, FlatList, Platform } from 'react-native'
import { useTranslation } from 'react-i18next';

import { useNavigationSearch } from "@/src/hooks/useNavigationSearch";
import { COLORS, SIZES } from '@/src/constants'
import { useMemo } from 'react';
import { affirmationsCardData } from '@/src/constants/affirmationsCardData';
import AffirmationCard from '@/src/components/home/AffirmationCard';
import { generateRandomAffirmations } from '@/src/utils/generateRandomAffirmations';
import { useAffirmations } from '@/src/store/useAffirmations';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Search = () => {
    const { top } = useSafeAreaInsets();
    const { t } = useTranslation();
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: t("library.placeholder"),
        },
    });

    const { setSelectedAffirmations } = useAffirmations();
    const filteredBooks = useMemo(() => {
        if (!search) return affirmationsCardData;

        return affirmationsCardData.filter((affirmation) =>
            t(affirmation.title).toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />
            <FlatList
                data={filteredBooks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AffirmationCard
                        title={t(item.title)}
                        image={item.image}
                        color={item.color}
                        affirmationFormat={item.affirmationFormat as "text" | "audio"}
                        onPress={() => {
                            //router.push("/affirmationscroll");
                            //const affirmations = generateRandomAffirmations(affirmationsGeneral, 30);
                            //setSelectedAffirmations(affirmations);
                            //console.log("Affirmations", affirmations)
                            //console.log(item.title)
                            console.log("item", item)
                        }}
                    />
                )}
                numColumns={2} // Configura dos columnas
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: SIZES.height * 0.02, marginTop: Platform.OS === "ios" ? top + 90 : 5, }}
            />
        </View>
    )
}

export default Search
