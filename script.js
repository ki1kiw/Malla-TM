function mostrarInfo(curso) {
  const info = {
    anatomia: `
      <h2>Anatomía I</h2>
      <p><strong>Créditos:</strong> 6</p>
      <p><strong>Prerrequisito:</strong> Ninguno</p>
      <p><strong>Contenidos:</strong> Sistema osteomuscular, planos anatómicos.</p>
    `,
    fisiologia: `
      <h2>Fisiología</h2>
      <p><strong>Créditos:</strong> 5</p>
      <p><strong>Prerrequisito:</strong> Anatomía I</p>
      <p><strong>Contenidos:</strong> Fisiología celular, sistemas orgánicos.</p>
    `,
    bioquimica: `
      <h2>Bioquímica</h2>
      <p><strong>Créditos:</strong> 4</p>
      <p><strong>Prerrequisito:</strong> Ninguno</p>
      <p><strong>Contenidos:</strong> Proteínas, enzimas, metabolismo energético.</p>
    `
  };

  const divInfo = document.getElementById('infoCurso');
  divInfo.innerHTML = info[curso];
  divInfo.style.display = 'block';
}
