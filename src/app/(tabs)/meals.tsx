import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Appbar, Searchbar, Text } from "react-native-paper";

import { router, useLocalSearchParams } from "expo-router";

import { getMealsByCategory, searchMeals } from "@/services/mealApi";

import MealCard from "@/components/MealCard";
import { MealPreview } from "@/types/meal";

// =========================================

export default function MealsScreen() {
  // 1
  const params = useLocalSearchParams<{
    category?: string;
  }>();

  // 2
  const [query, setQuery] = useState<string>("");
  const [meals, setMeals] = useState<Array<MealPreview>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 3
  async function loadData(category: string) {
    try {
      setLoading(true);
      const data = await getMealsByCategory(category);
      setMeals(data);
      // ->
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 4
  useEffect(() => {
    if (params.category) {
      loadData(params.category);
    }
  }, [params.category]);

  // 5
  async function handleSearch() {
    if (!query.trim()) {
      return;
    }
    try {
      setLoading(true);
      const data = await searchMeals(query);
      setMeals(data);
      // ->
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // UI
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content
          title={params.category ? params.category : "Пошук страв"}
        />
      </Appbar.Header>
      <View
        style={{
          padding: 16,
        }}
      >
        <Searchbar
          placeholder="Вкажіть назву страви..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            marginTop: 30,
          }}
        />
      ) : meals.length === 0 ? (
        <Text
          variant="bodyLarge"
          style={{
            textAlign: "center",
            marginTop: 30,
          }}
        >
          Введіть назву страви
        </Text>
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => router.push(`/meal/${item.idMeal}`)}
            />
          )}
        />
      )}
    </View>
  );
}
