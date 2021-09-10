import { ref, computed, watch } from 'vue';
export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(function() {
    let filterItems = [];
    if (activeSearchTerm.value) {
      //this one way for send function on filter
      // filterItems = items.filter(filterFn);

      filterItems = items.value.filter(item =>
        item[searchProp].includes(activeSearchTerm.value)
      );
    } else if (items.value) {
      filterItems = items.value;
    }
    return filterItems;
  });

  watch(enteredSearchTerm, function(newValue) {
    console.log('newValue', newValue);
    setTimeout(() => {
      if (newValue === enteredSearchTerm.value) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch
  };
}
