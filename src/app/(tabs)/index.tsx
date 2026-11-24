import { router } from "expo-router";

import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { ActivityIndicator, Appbar, Text } from "react-native-paper";

import CategoryCard from "@/components/CategoryCard";
import { getCategories } from "@/services/mealApi";
import { Category } from "@/types/meal";

// =================================================

export default function HomeScreen() {
  // 1
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 2
  async function loadCategories() {
    try {
      setLoading(true);
      setError("");
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError("Помилка завантаження категорій: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // 3
  useEffect(() => {
    loadCategories();
  }, []);

  // 4
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // UI
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Категорії страв" />
      </Appbar.Header>
      {error ? (
        <Text
          style={{
            margin: 20,
            textAlign: "center",
            color: "red",
            fontSize: 16,
          }}
        >
          {error}
        </Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => {
                router.push({
                  pathname: "/meals",
                  params: {
                    category: item.strCategory,
                  },
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
}
