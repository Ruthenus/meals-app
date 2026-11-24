import { Category } from "@/types/meal";
import { Card, Text } from "react-native-paper";

// =========================================
interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

// =========================================

export default function CategoryCard(props: CategoryCardProps) {
  // 1
  const { category, onPress } = props;

  return (
    <Card mode="elevated" onPress={onPress} style={{ marginBottom: 16 }}>
      <Card.Cover source={{ uri: category.strCategoryThumb }} />
      <Card.Content style={{ paddingTop: 12 }}>
        <Text variant="titleLarge">{category.strCategory}</Text>
        <Text variant="bodyMedium" numberOfLines={3}>
          {category.strCategoryDescription}
        </Text>
      </Card.Content>
    </Card>
  );
}