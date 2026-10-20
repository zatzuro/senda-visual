"use strict";
/* SENDA Pages: visualización estática. No hace llamadas de red ni escribe datos. */
const el = id => document.getElementById(id);
const fmt = value => Number(value).toLocaleString("es-CO",{maximumFractionDigits:0});
const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const cuota = [900,960,1100,1150,1280,1320,1380,1450,1200,1330,1400,1530];
const serie = [
  {anio:2022,ventas:9100,mercado:95500},
  {anio:2023,ventas:10400,mercado:102500},
  {anio:2024,ventas:11200,mercado:113700},
  {anio:2025,ventas:12400,mercado:122000},
  {anio:2026,ventas:13600,mercado:129000}
];
function put(id,html){if(el(id)) el(id).innerHTML=html;}
function text(id,value){if(el(id))el(id).textContent=value;}
function demoStatus(){
  text("notice","VISTA PREVIA • datos 100 % ficticios. No hay servidor ni cálculos reales. Abra SENDA en Codespaces o Windows para operar.");
  if(el("notice"))el("notice").classList.add("success");
}
function renderLab(){
  text("server-state","Vista estática • sin conexión al motor");
  put("years-body",serie.map(x=>"<tr><td>"+x.anio+"</td><td>12/12 (simulado)</td><td>"+fmt(x.ventas)+" MM (ejemplo)</td></tr>").join(""));
  text("active-info","Ejemplo visual: históricos sintéticos 2022–2026, no se han importado archivos.");
  text("preview-results","En esta vista no se permite importar datos.");
  text("config-status","Configuración simulada: los valores aquí no representan una fórmula aprobada.");
  text("weight-rows","Años ilustrativos (sin guardar): 2023: 10 %, 2024: 20 %, 2025: 30 %, 2026: 40 %.");
  text("weight-sum","Suma visual: 100 %");
  if(el("config-year"))el("config-year").value="2027";
  if(el("target-year"))el("target-year").value="2027";
  if(el("first-year"))el("first-year").value="2024";
  if(el("prediction"))el("prediction").classList.remove("hidden");
  text("snap-id","• DEMO, no guardado");
  text("f-total","14.900 MM");
  text("s-total","15.000 MM");
  text("conf","Ejemplo");
  text("explanation","Datos totalmente sintéticos. F, S y sus diferencias se muestran solo para recorrer el diseño; el motor Python no se ejecuta en Pages.");
  text("quality-info","Sin evidencia real ni pronósticos persistidos.");
  text("learning-info","El aprendizaje real necesita base DuckDB y backend FastAPI.");
  put("monthly",meses.map((m,i)=>"<tr><td>"+m+"</td><td>"+fmt(quota(i)*0.993)+"</td><td>"+fmt(quota(i))+"</td><td>"+fmt(quota(i)*0.007)+"</td></tr>").join(""));
  if(el("comparison-chart")){
    const pts=cuota.map((v,i)=>(20+i*58)+","+(220-v/9)).join(" ");
    el("comparison-chart").innerHTML='<polyline fill="none" stroke="#9cbaf0" stroke-width="4" points="'+pts+'"/><text x="25" y="25" fill="#d2e4ff">Ejemplo sintético • no es predicción real</text>';
  }
  text("comparison-meta","Curva sintética para visualizar diseño y navegación.");
  if(el("backtest-output"))el("backtest-output").classList.remove("hidden");
  put("backtest-rows",'<tr><td>2024 (demo)</td><td>11.300</td><td>11.100</td><td>11.200</td><td>0,9 %</td><td>S (ejemplo)</td></tr>');
  text("global-result","No se han ejecutado retropruebas; esta fila es ficticia.");
  text("knowledge-list","La memoria real se consulta en la aplicación ejecutable.");
  text("records-content","Esta vista no conserva snapshots ni historial.");
  document.querySelectorAll(".nav [data-tab]").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".nav [data-tab]").forEach(b=>b.classList.toggle("selected",b===btn));
    document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("active",p.id===btn.dataset.tab));
  }));
}
function quota(i){return cuota[i];}
function renderAnnual(){
  text("sources-list","Fuentes de demostración: cifras ficticias, sin importación ni versiones guardadas.");
  const cards=serie.map(x=>'<div style="min-width:110px;flex:1"><div style="height:158px;display:flex;align-items:end;justify-content:center;gap:7px"><div title="Mercado de ejemplo" style="height:'+(x.mercado/1450)+'%;max-height:100%;background:#448bfa;width:29px;border-radius:5px 5px 0 0"></div><div title="Ventas de ejemplo" style="height:'+(x.ventas/145)+'%;max-height:100%;background:#ff9654;width:29px;border-radius:5px 5px 0 0"></div></div><div style="text-align:center;margin-top:9px">'+x.anio+'</div><small style="display:block;text-align:center;color:#a9b9d0">ficticio</small></div>').join("");
  put("chart",'<div style="display:flex;align-items:end;min-width:580px;gap:15px;padding:20px 10px">'+cards+'</div>');
  put("year-table",serie.map(x=>'<tr><td>'+x.anio+'</td><td>'+fmt(x.ventas)+'</td><td>'+fmt(x.mercado)+'</td><td>—</td><td>—</td><td>—</td><td>'+((x.ventas/x.mercado)*100).toFixed(1)+' %</td><td>—</td><td>Ficticio</td></tr>').join(""));
  put("lights-list",serie.map(x=>'<div class="year-card green"><h3>'+x.anio+'</h3><p>Histórico sintético para navegación.</p><span class="good">Referencia visual</span></div>').join(""));
  put("recommendation",'<h3>Ejemplo de recomendación 2027</h3><div class="kpis"><div class="kpi"><span>Fórmula (ejemplo)</span><strong>14.900 MM</strong></div><div class="kpi"><span>SENDA (ejemplo)</span><strong>15.000 MM</strong></div></div><p class="hint">No procede del modelo ni constituye una recomendación presupuestal.</p>');
  put("decision-preview","Ilustración de decisión gerencial: 15.000 MM ficticios. No se puede confirmar ni guardar.");
  put("monthly-status",'<p>Vista previa disponible: <a href="./monthly.html">Abrir distribución mensual simulada →</a></p>');
}
function renderMonthly(){
  put("annual-select",'<option>PRISA demo 2027 • 15.000 MM ficticios</option>');
  text("annual-summary","Ejemplo visual: presupuesto anual ficticio de 15.000 MM, sin versión confirmada real.");
  put("legend",'<span class="legend-item">🟢 Año ficticio de referencia</span><span class="legend-item">🔵 2027 escenario ficticio</span>');
  put("history",serie.slice(2).map(x=>'<div class="history-row"><div class="year-info"><strong>'+x.anio+' (demo)</strong><small>Cifras ficticias</small></div><div class="bar-track">'+cuota.map(v=>'<div class="bar-segment" style="width:'+(100/12)+'%;background:#608ec6"></div>').join("")+'</div><div class="light-cell"><small>Referencia visual</small></div></div>').join(""));
  put("proposal",'<h3>Propuesta ilustrativa • no calculada</h3><p>Los doce importes ficticios suman exactamente 15.000 MM. SENDA real no se está ejecutando.</p>');
  function setMonthly(period){
    document.querySelectorAll("[data-period]").forEach(b=>{b.classList.toggle("chosen",b.dataset.period===period);b.setAttribute("aria-pressed",String(b.dataset.period===period));});
    const groups=period==="mes"?cuota.map((v,i)=>[meses[i],v]):period==="trimestre"?[0,1,2,3].map(i=>["T"+(i+1),cuota.slice(i*3,i*3+3).reduce((a,b)=>a+b,0)]):[0,1].map(i=>["S"+(i+1),cuota.slice(i*6,i*6+6).reduce((a,b)=>a+b,0)]);
    put("editor",'<div class="'+(period==="mes"?"monthly-grid":"aggregates")+'">'+groups.map(([k,v])=>'<div class="month-card"><strong>'+k+'</strong><div style="font-size:19px;font-weight:750;margin:12px 0">'+fmt(v)+' MM</div><span class="difference">Dato ficticio, solo lectura</span></div>').join("")+'</div>');
    text("view-label",period.toUpperCase()+" • demostración");
  }
  put("totals",'<div class="total-box"><span>Presupuesto ficticio</span><strong>15.000 MM</strong></div><div class="total-box"><span>Distribuido ficticio</span><strong>15.000 MM</strong></div><div class="total-box"><span>Diferencia de ejemplo</span><strong>0 MM</strong></div>');
  text("draft-status","Sin guardado: ningún dato se envía o almacena en SENDA.");
  text("confirmed-versions","No hay versiones guardadas en esta demostración.");
  document.querySelectorAll("[data-period]").forEach(b=>b.addEventListener("click",()=>setMonthly(b.dataset.period)));
  setMonthly("mes");
}
window.addEventListener("DOMContentLoaded",()=>{
  demoStatus();
  if(el("server-state"))renderLab();
  if(el("lights-list"))renderAnnual();
  if(el("annual-select"))renderMonthly();
  document.querySelectorAll("form").forEach(f=>f.addEventListener("submit",e=>e.preventDefault()));
  document.querySelectorAll('button:not([data-tab]):not([data-period])').forEach(b=>{b.disabled=true;b.title="Acción deshabilitada: abra SENDA real para operar";});
  document.querySelectorAll('input,select,textarea').forEach(f=>{f.disabled=true;f.title="Solo lectura en Pages";});
});
