
const cursos = [
  { id: "morfo1", nombre: "Morfofunción I", semestre: 1 },
  { id: "mate", nombre: "Matemáticas y Biofísica", semestre: 1 },
  { id: "biocel", nombre: "Biología Celular y Genética", semestre: 1 },
  { id: "comunicacion", nombre: "Comunicación y Tecnología", semestre: 1 },
  { id: "etica", nombre: "Orientación y Ética", semestre: 1 },
  { id: "morfo2", nombre: "Morfofunción II", semestre: 2, req: ["morfo1", "biocel"] },
  { id: "quimica", nombre: "Química General y Orgánica", semestre: 2, req: ["mate"] },
  { id: "ingles1", nombre: "Inglés I", semestre: 2 },
  { id: "cfg1", nombre: "CFG 1", semestre: 2 },
  { id: "cfg2", nombre: "CFG 2", semestre: 2 },
  { id: "fisiopato", nombre: "Fisiopatología y Farmacología", semestre: 3, req: ["morfo2", "quimica"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3, req: ["quimica"] },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, req: ["ingles1"] },
  { id: "cfg3", nombre: "CFG 3", semestre: 3 },
  { id: "cfg4", nombre: "CFG 4", semestre: 3 },
  { id: "inmunobasica", nombre: "Inmunología Básica", semestre: 4, req: ["fisiopato"] },
  { id: "bioseguridad", nombre: "Bioseguridad y Enfermería", semestre: 4, req: ["fisiopato", "bioquimica"] },
  { id: "labclinico", nombre: "Métodos de Laboratorio Clínico", semestre: 4 },
  { id: "biomol", nombre: "Biología Molecular", semestre: 4 },
  { id: "ingles3", nombre: "Inglés III", semestre: 4, req: ["ingles2"] },
  { id: "cfg5", nombre: "CFG 5", semestre: 4 },
  { id: "hematoclinica1", nombre: "Hematología Clínica I", semestre: 5, req: ["bioseguridad", "labclinico"] },
  { id: "bioqclinica1", nombre: "Bioquímica Clínica I", semestre: 5, req: ["bioseguridad", "labclinico", "inmunobasica"] },
  { id: "biomolaplicada", nombre: "Biología Molecular Aplicada", semestre: 5, req: ["biomol"] },
  { id: "saludpublica", nombre: "Salud Pública y Epidemiología", semestre: 5, req: ["bioseguridad"] },
  { id: "hematoclinica2", nombre: "Hematología Clínica II", semestre: 6, req: ["hematoclinica1"] },
  { id: "bioqclinica2", nombre: "Bioquímica Clínica II", semestre: 6, req: ["bioqclinica1"] },
  { id: "inmunoclinica", nombre: "Inmunología Clínica", semestre: 6, req: ["bioqclinica1"] },
  { id: "gestion", nombre: "Administración y Gestión en Salud", semestre: 6, req: ["saludpublica"] },
  { id: "cfg6", nombre: "CFG 6", semestre: 6 },
  { id: "micro", nombre: "Microbiología Clínica", semestre: 7, req: ["biomolaplicada", "bioqclinica2"] },
  { id: "inmunohema", nombre: "Inmunohematología", semestre: 7, req: ["inmunoclinica", "hematoclinica2"] },
  { id: "hematoclinica3", nombre: "Hematología Clínica III", semestre: 7, req: ["hematoclinica2"] },
  { id: "calidad", nombre: "Gestión de Calidad", semestre: 7, req: ["gestion"] },
  { id: "diagnostico", nombre: "Diagnóstico Microbiológico", semestre: 8, req: ["micro"] },
  { id: "transfusional", nombre: "Medicina Transfusional", semestre: 8, req: ["inmunohema"] },
  { id: "electivo1", nombre: "Electivo Profesional I", semestre: 8 },
  { id: "gestioninvestigacion", nombre: "Gestión e Investigación en Salud", semestre: 8, req: ["calidad"] },
  { id: "internado1", nombre: "Internado I", semestre: 9 },
  { id: "electivo2", nombre: "Electivo Profesional II", semestre: 9 },
  { id: "electivo3", nombre: "Electivo Profesional III", semestre: 9 },
  { id: "gestionprimaria", nombre: "Gestión en Atención Primaria", semestre: 9, req: ["gestioninvestigacion"] },
  { id: "internado2", nombre: "Internado II", semestre: 10 }
];

const estadoCursos = {};

function crearCurso(curso) {
  const div = document.createElement("div");
  div.className = "curso";
  div.textContent = curso.nombre;
  div.id = curso.id;

  if (curso.abre) div.dataset.abre = curso.abre.join(",");

  div.onclick = () => {
    if (div.classList.contains("bloqueado")) return;

    div.classList.add("aprobado");
    div.onclick = null;
    estadoCursos[curso.id] = true;

    // desbloquear los que dependan de este
    cursos.forEach(c => {
      if (c.req && c.req.every(r => estadoCursos[r])) {
        const target = document.getElementById(c.id);
        if (target && target.classList.contains("bloqueado")) {
          target.classList.remove("bloqueado");
        }
      }
    });
  };

  return div;
}

window.onload = () => {
  const contenedor = document.getElementById("malla");
  const semestres = [...new Set(cursos.map(c => c.semestre))];

  semestres.forEach(num => {
    const section = document.createElement("div");
    section.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${num}`;
    section.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid-container";

    cursos.filter(c => c.semestre === num).forEach(curso => {
      const div = crearCurso(curso);

      // bloquear solo si tiene requisitos que no se han cumplido
      if (curso.req && curso.req.length > 0) {
        div.classList.add("bloqueado");
      }

      grid.appendChild(div);
    });

    section.appendChild(grid);
    contenedor.appendChild(section);
  });
};
