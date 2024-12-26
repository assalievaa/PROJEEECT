const stickersList = document.querySelector("#stickers");

const fetchStickers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error(`Ошибка:${response.status}`);
        }

        const stickers = await response.json();
        renderStickersList(stickers);
    } catch (error) {
        console.error("Ошибка загрузки!:", error);
    }
};

const renderStickersList = (data) => {
    data.forEach((sticker) => {
        const stickerCard = document.createElement("div");
        stickerCard.classList.add("sticker-card");


        const stickerImage = document.createElement("img");
        stickerImage.setAttribute("src", "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDQ4QDQ8NDw0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLjcBCgoKDg0OFQ8PFSsZFRkrLSstKysrLSs3NzctKy0rLS0tLTc3LS0rKy0rLTcrKysrNy0rKystKysrKysrKysrK//AABEIANoA5wMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EACwQAAICAgICAQMEAgIDAAAAAAABAgMEEQUhEjFBBlFhEyIycYGRFMEVQqH/xAAXAQEBAQEAAAAAAAAAAAAAAAABAAID/8QAGhEBAQEBAQEBAAAAAAAAAAAAAAERMRJBIf/aAAwDAQACEQMRAD8A9MAjchPJhhiUCPyE8iwpNhsj2CZYEjZHJg+xGMiAsWIJsUfKWxgbAMWFQgjG+RYRNjAkxBgAABIAAhYiBJijJsJEYAAKAjFGkgIxWyNskQBrAk2AHxiOcA1I0tiuI7Q2TDUaIKCEFGjmNJobGuYoaDUNAKNkx1ElIZsQCAAAKoAIw2GoSGKY8jmjSPTI7ATEZImw2IBIuxGwGSZISkR7FYhIAAEm6gbGzGbMxHuRGKxBxAGAMzTAAIGCACAaxCRGx8hjIU0AAtQABBiA0XY1yCwnbI2xfIayFAMRsRs0gxuxJMaUR7kNYgbJEYiBgyRsmA0CTcbEFSDQIgABbiKAgMzasAjAGUIBsGyOTHQWTGWTUVuTSX5KnIchCiLcn38I4nkuasvftqP2QKR1eZz9NfqXk/wZV31TL/1j1+TmXIz8vN10g1rHWS+qZ/ZCL6ksOK/5LJoZRasdxjfU3xNf5NfG5WqzWpJfhnmkbixC/wCz0OrHqMZJ+mn/AJF2ecUcrbD1JmrjfVFi/kky0Y7BiGNg8/XY9P8Aa2a3ltbRISYgMQZWSjQkxmxR41sbsBIAa2BJviD2MYAgABitQBsQNkSojndFe2l/Y3IuUYt79I4nkc2c5N7et9f0Idv+pFrpr/Zi8xzldScYPynrrXpHKf8APs9eUv8AZVsj5PbZLDM7Nna9zk3+PgrQiyeVaXtkFk18GdakMun8Iw8qTUmbfQyVEH/JEWHGbJIM2Fh1P40MfHx30yClG7RJG9lxcYvuRvCivkgZG5iPJ0SyrjFdlGxdgVyGY12je4f6klBqNjbi/v8ABy+9Da7Oxgr1vFyI2RUovaZPs4b6d5GVT8X3F/8Aw7Gm9SSa9M0ziWTGbHNjWQo2JsQRlpkKAghr0XRNjQ2BkYBAACBtr0tjyHIfT/ocTlOf5SX8I+vkwFkt+0X+VX73/Zk5V0K15Sev7BRNNr2RqxfBy3IfUG3qtP8AvfRlrm7FLexLt7I+RCsSRjcV9SeTUbF23rZ1ELE/T+DNKg6deyByNHJRVrq+4ajIQZK3oknNJf0YHJcyotpdlqa88n4IXacz/wCWm/lF3H5Dz+2yxNHIs+4Yc4yemUbZ7G4z09ji1q5mLrteinV0/wDImTmy1pMpxueyDqMV+jpeIy9ag/n5OT4yxSijaw3+5aGKuti+hSOr+KHNjrOFGsGxrkB4VsQZsDQ10YABloADGzYwadtFXNt8Ytv7Exl83bqDX3FT9cdyWRuUn+WebfUPKTttlFP9kX0vud7n1+Skt62mjzDkaXCyUZe037AtLgOLWVPwc1BLvbeiHnMCNFjjCxTS+xlwtlH+Lcf6ehJWNvbe/wC+yFqeibUlr4O64nIbjHv4OW4vBjKPm338ROl46vxigqjVlaMlZ0V5WDZT2YaQZ2V4wk17OTyKbJeU9Npe3o6HkU3F6MbJ5Kddcqo+p+zUZrHlYxY5Ml6ZC3sazeMa6DBy/NaftFuMjn+Mk/Na/wAnQxj8ma3BJNkUy9jJN6ZLk4L1+1BEZxN7i/Z1fFW+Ukcpg4zi+zrvp6n96b9IfpddD+KAVehsmIEmMYuxBkFpAAQVjpRGxGxrZlWl8hrYghDA5GPy72n/AEatjMHlbfa/BGOYyl2zl/qHif1f3RX7jqre9lO+Jm1qPO7OItXuLJcbh5N9o7GyvY3w16DVjLxeO8NGgnoZZMgsk9FqkWJ2DP1jPnY/uR/qfkocabfkZ2fxcZptdMnx7GTuRoVyV/GWRfrZF/xJ/MTrZMhmkOs+WZxuH4LbXbLttn2JUkRzqYNLPG1NvZvQh0ZnFR0uzZj6JKjr7Oh4HRjTLmBleEloYnXxl0JIq49+0WNjjIEADSwAJJiFq10bEYmwMDCBsGNBpFYznuUfbOhsMDlK32aDnrCtYtluxexirM2NRnzgRyiav6OxXiRZmlg2Ub7RWspetHRvA+xn5tHgGFzV0GvZGbk6oyWmirdiqBpI8Wv9pdhTr2JhQ2ui1KJJQtrRWnA0LYlG+aCMq2yWD2RpEtaNJewnpm3VHox8Ovs2a3pGoLVfK6ZHTPtDMu3sZTLtCHU4FvSNSEzBwGzYpYhY8w8hgplFbAawNLHSAJsGzm1gYgeQ3yJCZnZ9Pki/Jkco7EOOyqHGT2RROkzsNS/sxbsRxYlCoj4xBR0OigxaVrRm8lX5RNOSKl6AxzcouPso5ljkb+XVsznhoGlfAscUWvPYLFfpFuvD6JM64pzobNyzEIHQOM1mRp0SQrL/AOgSxoSEGY8NE1tmkI+irdbseCopvbLOFBtlatbZucbjd7/BBo4lfRo1LRDRAtJGkUAEDEVgIAtOichjYMNGBpAEYmyRRGA2TImyKuRSmWRlq6FliZFKRUnYkaGXH2c5nWtbAtH9eOiCdsX8nM5PISj6ZU/8pPeyLrpUxY1Y0V8GLjc312i7DlIv5BrVx1xXwH6i+DGzeX+IlSvkWFTo5EEoGfRym+miw8okfN6K87mOlPZUvlodB1txWlIhlMFItC5je0dNgf8ARzWJ7R02D/0agadBMQUMnNIAACgAjYBqdAAjYmzOoMQBGZJGxuwEbNcZGxs/Quxs/RbqZ+RHpnN8nj9M6i9dGRmV7TAuEzae9FJ1s6DkMft9GXZDRNKfiPTZI0JoAhkNRO0McSIjbosrL/JSGyfQJpxzURzv8jNiWq10KP2PiM0SQRKL+F8HRYLMDAh2dBiR0MDRoZaRTpeixGZoHSYzYrYhaCbFEAC6IQbsHIMOl2DY0B8gCMURlVhok30JIaAR2RKGRVvZpSK1sSTms7F3voxMrFOxyK0ZOZjLsq1HI2w0yNmrl4v4M6ypr4DCiGsc0MII2Ko7HOIsUGE2NWiWKAdEQEi1TXsjqr29I2cXC67BFwqdGvjohpx9F6uvRuRaWBNBjVAekOMnAA3yEnAN8gJOgEYojBE2HkIJIUd5CeaGCMzUWTEACxmkZFOBKxBxpStq2VLsfZrTKthWDWHfifgoW8fF+0dBairYjLTlszjNdxM2dLR2Vy6MXNiu+l/oDjDcRYwZakh1aIKqpbLFOHJlupLfo0cZEkeFhKPb9mnVUNr9lusZEdCGieMRsSU1ARhsGRsUVyGCiACgIBJ//9k=");
        stickerImage.setAttribute("alt", "sticker Image");


        const stickerTitle = document.createElement("h3");
        stickerTitle.innerText = sticker.title;


        const stickerText = document.createElement("p");
        stickerText.innerText = sticker.body;

        stickerCard.append(stickerImage);
        stickerCard.append(stickerTitle);
        stickerCard.append(stickerText);

        stickersList.append(stickerCard);
    });
};


fetchStickers();