# /vue3

Apply Vue 3 with TypeScript and Composition API patterns.

## Usage

```
/vue3 [component-or-composable]
```

## When to Invoke

Use this command when:
- Creating Vue 3 components
- Using Composition API
- Building custom composables
- Managing Vue state

## Standards Applied

### Component Structure
- `<script setup>` syntax
- `defineProps<Props>()` for props
- `defineEmits<Emits>()` for events
- Proper TypeScript types

### Composition API
- Composables for reusable logic
- Prefix with 'use'
- Eager loading for relationships
- Query scopes for reuse

### TypeScript Integration
- Enable strict mode
- Type reactive objects
- Use generic components
- Type provide/inject

## Examples

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const doubled = computed(() => props.count * 2);
</script>
```

## Agent

Uses **BasicBitch** for implementation.

## Related

- `/typescript` - TypeScript fundamentals
