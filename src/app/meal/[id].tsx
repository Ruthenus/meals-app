import { router, useLocalSearchParams } from "expo-router";
// https://docs.expo.dev/router/reference/hooks/#uselocalsearchparams
// https://docs.expo.dev/router/navigating-pages/

import { useEffect, useState } from "react";
// https://react.dev/reference/react/useState
// https://react.dev/reference/react/useEffect

import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  View,
} from "react-native";
// https://reactnative.dev/docs/scrollview
// https://reactnative.dev/docs/image
// https://reactnative.dev/docs/linking
// https://reactnative.dev/docs/activityindicator

import { Appbar, Button, Divider, Text } from "react-native-paper";
// https://oss.callstack.com/react-native-paper/docs/components/Appbar/Appbar
// https://oss.callstack.com/react-native-paper/docs/components/Button/Button
// https://oss.callstack.com/react-native-paper/docs/components/Text/Text
// https://oss.callstack.com/react-native-paper/docs/components/Divider

import { getMealById } from "@/services/mealApi";
import { Meal } from "@/types/meal";

// Допоміжна функція: збирає інгредієнти + мірки
function getIngredients(meal: Meal): { ingredient: string; measure: string }[] {
  const result: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      result.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return result;
}

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");
        const data = await getMealById(id);
        if (!data) {
          setError("Страву не знайдено");
        } else {
          setMeal(data);
        }
      } catch (err: any) {
        setError("Помилка завантаження: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !meal) {
    return (
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Рецепт" />
        </Appbar.Header>
        <Text
          style={{
            margin: 20,
            textAlign: "center",
            color: "red",
            fontSize: 16,
          }}
        >
          {error || "Страву не знайдено"}
        </Text>
      </View>
    );
  }

  const ingredients = getIngredients(meal);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Рецепт" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Зображення */}
        <Image
          source={{ uri: meal.strMealThumb }}
          style={{ width: "100%", height: 260 }}
          resizeMode="cover"
        />

        <View style={{ padding: 16 }}>
          {/* Назва */}
          <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
            {meal.strMeal}
          </Text>

          {/* Категорія та кухня */}
          <Text variant="bodyMedium" style={{ color: "#664", marginBottom: 4 }}>
            Категорія: {meal.strCategory}
          </Text>
          <Text
            variant="bodyMedium"
            style={{ color: "#664", marginBottom: 16 }}
          >
            Кухня: {meal.strArea}
          </Text>

          <Divider style={{ marginBottom: 16 }} />

          {/* Інгредієнти */}
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Інгредієнти
          </Text>

          {ingredients.map((item, index) => (
            <Text key={index} variant="bodyMedium" style={{ marginBottom: 6 }}>
              • {item.measure ? `${item.measure} ` : ""}
              {item.ingredient}
            </Text>
          ))}

          <Divider style={{ marginVertical: 16 }} />

          {/* Інструкція */}
          <Text variant="titleMedium" style={{ marginBottom: 12 }}>
            Приготування
          </Text>
          <Text variant="bodyMedium" style={{ lineHeight: 22 }}>
            {meal.strInstructions}
          </Text>

          {/* Кнопки YouTube / Source */}
          <View style={{ marginTop: 24, gap: 12 }}>
            {meal.strYoutube ? (
              <Button
                mode="contained"
                icon="youtube"
                onPress={() => Linking.openURL(meal.strYoutube!)}
              >
                Відео на YouTube
              </Button>
            ) : null}

            {meal.strSource ? (
              <Button
                mode="outlined"
                icon="open-in-new"
                onPress={() => Linking.openURL(meal.strSource!)}
              >
                Джерело рецепта
              </Button>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
