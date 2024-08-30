<template>
    <div class="seo">
        <ul>
            <li v-for="(text, index) in props.data">
                {{ index + 1 }}.{{ text }}
            </li>

        </ul>
        <!-- {{ props.data }} -->
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: Array<string>
}>()
</script>

<style scoped></style>