<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-square">
                <img :src="getCover(book)" alt="Book image" />
            </figure>
        </div>
        <div class="card-content">
            <div class="content is-size-7">
                <p class="has-text-weight-bold">
                    {{ book.title }}
                </p>
                <a @click="showModal">Vedi dettagli</a>

                <!-- modale per dettagli e azioni -->
                <div ref="book_modal" class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-content is-size-6">
                        <div class="card">
                            <div class="card-content">
                                <div class="content">
                                    <div class="columns">
                                        <div class="column">
                                            <span>
                                                <strong>{{ book.title }}</strong>
                                            </span>
                                            <div class="details">
                                                <span>
                                                    di
                                                    <span
                                                        class="has-text-info"
                                                        v-for="author in book.author"
                                                        :key="author"
                                                    >
                                                        {{ author }}
                                                        <span
                                                            v-if="book.author.indexOf(author) != book.author.length - 1"
                                                            >,
                                                        </span>
                                                    </span>
                                                </span>
                                                <br />
                                                <span><em>Anno:</em> {{ book.year }}</span>
                                                <br />
                                                <span
                                                    ><em>Lingue: </em>
                                                    <span v-for="language in book.language" :key="language">
                                                        {{ language
                                                        }}<span
                                                            v-if="
                                                                book.language.indexOf(language) !=
                                                                    book.language.length - 1
                                                            "
                                                            >,
                                                        </span>
                                                    </span></span
                                                >
                                                <br />
                                                <span
                                                    ><em>Argomenti: </em>
                                                    <span v-for="subject in book.subject" :key="subject">
                                                        {{ subject
                                                        }}<span
                                                            v-if="
                                                                book.subject.indexOf(subject) != book.subject.length - 1
                                                            "
                                                            >,
                                                        </span>
                                                    </span></span
                                                >
                                            </div>
                                        </div>
                                        <div class="actions column">
                                            <div v-if="book.in_library">
                                                <p>
                                                    Aggiunto il {{ new Date(book.addedAt).toLocaleDateString() }} alle
                                                    ore {{ new Date(book.addedAt).toLocaleTimeString() }}
                                                </p>
                                            </div>
                                            <button v-else class="button is-info" @click="addBook(book)">
                                                Aggiungi alla tua libreria
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["book"],
    data() {
        return {};
    },
    methods: {
        getCover(book) {
            if (book.cover_i) {
                return `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
            }

            return "./default_book.svg";
        },
        showModal(event) {
            event.target.nextElementSibling.classList.add("is-active");
        },
        closeModal() {
            this.$refs.book_modal.classList.remove("is-active");
        },
        addBook(book) {
            book.addedAt = new Date();
            book.in_library = true;
            //console.log(book.addedAt.toLocaleString());

            fetch("http://localhost:3000/myLibrary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book),
            })
                .then(response => response.json())
                .then(() =>
                    this.$router.push({
                        name: "Libreria",
                        params: { book: JSON.stringify(book) },
                    })
                )
                .catch(error => {
                    console.error("Error:", error);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.card .content p {
    height: 2.5rem;
    overflow-y: auto;
}
.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
