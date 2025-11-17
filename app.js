async function enviarChamado() {

  const matricula = document.getElementById("matricula").value;
  const nome = document.getElementById("nome").value;
  const setor = document.getElementById("setor").value;
  const assunto = document.getElementById("assunto").value;
  const descricao = document.getElementById("descricao").value;

  if (!matricula || !nome || !descricao) {
      document.getElementById("msg").innerText = "Preencha todos os campos!";
      return;
  }

  const novoChamado = {
      id: Date.now(),
      matricula,
      nome,
      setor,
      assunto,
      descricao,
      status: "Aberto",
      data: new Date().toLocaleString()
  };

  let dados = [];

  try {
    const response = await fetch("data.json");
    dados = await response.json();
  } catch (err) {
    dados = [];
  }

  dados.push(novoChamado);

  await fetch("data.json", {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(dados, null, 2)
  });

  document.getElementById("msg").innerText = "Chamado enviado com sucesso!";
}
