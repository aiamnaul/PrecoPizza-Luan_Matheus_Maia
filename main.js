// Função para calcular o custo-benefício
function calcularCustoBeneficio(tamanho, preco, formato) {
  let area, custoPorArea, diferenca;
  if (formato === "redonda") {
    const raio = tamanho / 2;
    area = Math.PI * raio * raio;
  } else if (formato === "retangular") {
    const [altura, largura] = tamanho.split("x").map(Number);
    area = altura * largura;
  } else if (formato === "quadrada") {
    const lado = Number(tamanho);
    area = lado * lado;
  }

  custoPorArea = preco / area;
  return custoPorArea;
}

// Função para adicionar uma pizza ao relatório
function adicionarPizza() {
  const nome = document.getElementById("nome").value;
  const tamanho = document.getElementById("tamanho").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const formato = document.getElementById("formato").value;
  const custoBeneficio = calcularCustoBeneficio(tamanho, preco, formato);

  const tabela = document.getElementById("tabela-pizzas");
  const newRow = tabela.insertRow(tabela.rows.length);
  newRow.innerHTML = `<td>${nome}</td><td>${tamanho} cm</td><td>R$${preco.toFixed(
    2
  )}</td><td>R$${custoBeneficio.toFixed(2)}</td><td>-</td>`;

  // Calcular a diferença e atualizar a coluna 'Diferença%'
  if (tabela.rows.length > 1) {
    const custoAnterior = parseFloat(
      tabela.rows[tabela.rows.length - 2].cells[3].textContent.replace("R$", "")
    );
    const diferenca = ((custoBeneficio - custoAnterior) / custoAnterior) * 100;
    newRow.cells[4].textContent = `${diferenca.toFixed(2)}%`;
  }

  document.getElementById("nome").value = "";
  document.getElementById("tamanho").value = "";
  document.getElementById("preco").value = "";
}

document.getElementById("adicionar-pizza").addEventListener("click", adicionarPizza);
