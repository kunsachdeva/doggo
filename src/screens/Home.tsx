
import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Avatar from "../components/Avatar";
import BreedTile from "../components/BreedTile";
import SearchInput from "../components/Search";
import Watermark from "../components/Watermark";
import COLORS from "../globals/colors";
import { PAGE_SIZE } from "../globals/constants";
import StateContext from "../store/context";
import { getAllBreeds } from "../store/network";

const Home = () => {
    const [breeds, dispatch] = useContext(StateContext) as Array<any>;
    const [selectedFilter, setSelectedFilter] = useState<string | null>("All")
    const [breedsToShow, setBreedsToShow] = useState<Array<string>>([])
    const [pageSize, setPageSize] = useState(PAGE_SIZE)

    const resetPageSize = () => setPageSize(PAGE_SIZE)

    useEffect(() => {
        resetPageSize()
    }, [breedsToShow])

    useEffect(() => {
        getAllBreeds().then((data) => {
            dispatch({ type: "SET_BREEDS", payload: data })
            setBreedsToShow(Object.keys(data))
        })
    }, [])

    useEffect(() => {
        if (!selectedFilter) return
        if (selectedFilter === "All") 
            setBreedsToShow(Object.keys(breeds))
        else setBreedsToShow(Object.keys(breeds).filter(breed => breed[0] === selectedFilter.toLowerCase()))
    }, [selectedFilter])

    const initials = Object.keys(breeds).reduce((acc, curr) => {
        if (acc.includes(curr[0].toUpperCase())) return acc
        return acc.concat(curr[0].toUpperCase())
    }, [] as Array<string>)

    const fetchMore = () => {
        setPageSize(Math.min(pageSize + PAGE_SIZE, breedsToShow.length))
    }

    const handleSearch = (searchInput: string) => {
        setSelectedFilter(null)
        setBreedsToShow(Object.keys(breeds).filter(breed => breed.indexOf(searchInput.toLowerCase()) > -1))
    }

    return (
        <>
            <View style={styles.container}>
                <Watermark />
                <SearchInput onSubmit={handleSearch} />
                <ScrollView horizontal style={{ height: 84, maxHeight: 84, minHeight: 84 }}>
                    {["All", ...initials].map(initial => <Avatar
                        isActive={selectedFilter === initial}
                        title={initial}
                        key={initial}
                        onPress={setSelectedFilter}
                    />)}
                </ScrollView>
                <FlatList
                    removeClippedSubviews
                    ListFooterComponent={<View style={{ height: 32 }} />}
                    data={breedsToShow.slice(0, pageSize)}
                    renderItem={({ item }) => <BreedTile breed={item} />}
                    onEndReached={fetchMore}
                    keyExtractor={(item) => item}
                />
            </View>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.light,
        flex: 1,
        overflow: "hidden",
        paddingTop: 48,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
});
