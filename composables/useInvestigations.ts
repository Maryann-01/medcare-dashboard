// import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, computed } from "vue";


interface Investigation {
  id: string;
  title: string;
  type: {
    id: string;
    title: string;
  };
}

interface Category {
  title: string;
  investigations: Investigation[];
}


const GET_INVESTIGATIONS = gql`
  query {
    investigations {
      id
      title
      type {
        id
        title
      }
    }
  }
`;

export const useInvestigations = () => {
  const { result, loading, error } = useQuery<{ investigations: Investigation[] }>(GET_INVESTIGATIONS);
  
  const groupedInvestigations = computed<Category[]>(() => {
    if (!result.value) return [];

    const categories = new Map<string, Investigation[]>();

    result.value.investigations.forEach((test: Investigation) => {
      const category = test.type.title;
      
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      
      categories.get(category)?.push(test);
    });

    return Array.from(categories, ([title, investigations]) => ({
      title,
      investigations,
    }));
  });

  return { groupedInvestigations, loading, error };
};
