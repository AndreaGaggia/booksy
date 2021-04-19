<template>
    <div class="books-list" v-if="books">
        <div class="columns is-multiline">
            <div v-for="book in books" :key="book.title" class="column is-2">
                <Book :book="book" />
            </div>
        </div>
    </div>
</template>

<script>
import Book from "./Book";
export default {
    components: { Book },
    props: ["books"],
};
</script>

<style lang="scss" scoped></style>
