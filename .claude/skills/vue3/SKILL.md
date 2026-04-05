---
name: vue3-typescript
description: Vue 3 with TypeScript and Composition API
model: inherit
triggers:
  - file_pattern: "*.vue"
---

# Vue 3 TypeScript Skill

Build type-safe Vue 3 applications with Composition API.

## When to Use

- Creating Vue 3 components
- Using Composition API
- Setting up Vue with TypeScript
- Managing Vue state

## Critical Rules

### Component Structure
- Use `<script setup>` syntax
- Define props with `defineProps<Props>()`
- Use `defineEmits<Emits>()` for events
- Leverage `defineExpose` when needed

### TypeScript Integration
- Enable strict mode in tsconfig.json
- Use `shallowRef` for large objects
- Type reactive objects properly
- Use generic components with `defineComponent`

### Composition API
- Use composables for reusable logic
- Prefix composables with 'use'
- Return readonly objects when appropriate
- Type provide/inject with InjectionKey

### State Management
- Use Pinia with TypeScript
- Define stores with setup syntax
- Type state, getters, and actions
- Use storeToRefs for reactive destructuring

## Examples

### Good
```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<{
  update: [value: number];
}>();

const doubled = computed(() => props.count * 2);
</script>
```

## Related

- `/typescript` - TypeScript fundamentals
- `/react` - Compare with React patterns
