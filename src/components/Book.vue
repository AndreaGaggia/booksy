<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="getCover(book)" alt="Book image" />
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <p class="has-text-weight-bold is-size-7">
                    {{ book.title }}
                </p>
                <div class="details is-size-7">
                    <p v-for="author in book.author" :key="author">
                        {{ author
                        }}<span
                            v-if="
                                book.author.indexOf(author) !=
                                    book.author.length - 1
                            "
                            >,
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["book"],
    methods: {
        getCover(book) {
            if (book.cover_i) {
                return `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            }

            return "./default_book.svg";
        },
    },
};
</script>

<style lang="scss" scoped>
.details {
    display: none;
}

.card:hover {
    background: rgba(41, 10, 219, 0.13);
    transition: all 0.3s ease;

    &.card .details {
        display: block;
    }
}
</style>
