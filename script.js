document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o Swiper.js
    const swiper = new Swiper(".swiper-container", {
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
    });

    // Consumo de API para Serviços
    fetch("https://api.exemplo.com/servicos")
        .then(response => response.json())
        .then(data => {
            const servicosContainer = document.getElementById("servicos-container");
            data.forEach(servico => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<h3>${servico.nome}</h3><p>${servico.descricao}</p>`;
                servicosContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Erro ao carregar serviços:", error));

    // Consumo de API para Testemunhos
    fetch("https://api.exemplo.com/testemunhos")
        .then(response => response.json())
        .then(data => {
            const testemunhosContainer = document.getElementById("testemunhos-container");
            data.forEach(testemunho => {
                const card = document.createElement("div");
                card.classList.add("testemunho");
                card.innerHTML = `<img src="${testemunho.foto}" alt="Foto de ${testemunho.nome}"><p>${testemunho.texto}</p><h4>${testemunho.nome}</h4>`;
                testemunhosContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Erro ao carregar testemunhos:", error));

    // Validação de Formulário
    document.getElementById("contato-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const mensagem = document.getElementById("mensagem").value;

        if (!nome || !email || !telefone || !mensagem) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Enviar os dados para a API (EmailJS ou outra solução)
        fetch("https://api.exemplo.com/enviar-contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone, mensagem })
        })
        .then(response => response.json())
        .then(data => alert("Mensagem enviada com sucesso!"))
        .catch(error => alert("Erro ao enviar mensagem."));
    });
});
