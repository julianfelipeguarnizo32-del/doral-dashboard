/**
 * DORAL STORE — Cargador de Datos Dinámico
 * 
 * Este script se ejecuta cuando el dashboard carga y:
 * 1. Lee los datos de window.DORAL_KPIS (inyectados por GitHub Actions)
 * 2. Actualiza todos los indicadores del dashboard
 * 3. Muestra el corte y fecha de última actualización
 * 
 * Si no hay datos inyectados, intenta cargar data/kpis.json
 */

(function() {
  'use strict';

  // ── Intentar cargar datos ──
  function loadData() {
    // Opción 1: datos ya inyectados en el HTML por GitHub Actions
    if (window.DORAL_KPIS && window.DORAL_KPIS.meta) {
      console.log('✅ Datos cargados desde HTML inyectado');
      return Promise.resolve(window.DORAL_KPIS);
    }

    // Opción 2: cargar desde data/kpis.json (desarrollo local o fallback)
    return fetch('data/kpis.json')
      .then(r => {
        if (!r.ok) throw new Error('No se encontró data/kpis.json');
        return r.json();
      })
      .then(data => {
        window.DORAL_KPIS = data;
        console.log('✅ Datos cargados desde data/kpis.json');
        return data;
      })
      .catch(err => {
        console.warn('⚠️ No se pudieron cargar datos externos:', err.message);
        return null;
      });
  }

  // ── Actualizar indicadores en el DOM ──
  function applyData(data) {
    if (!data || !data.meta) return;

    const g = data.global;
    const meta = data.meta;

    // Actualizar fecha/corte en el header
    document.querySelectorAll('[data-field="corte_label"]').forEach(el => {
      el.textContent = meta.corte_label || meta.corte;
    });
    document.querySelectorAll('[data-field="corte_badge"]').forEach(el => {
      el.textContent = meta.corte_badge || meta.corte;
    });
    document.querySelectorAll('[data-field="dias_operacion"]').forEach(el => {
      el.textContent = meta.dias_operacion + ' días de operación';
    });

    // Actualizar KPIs globales si el dashboard tiene funciones de render
    if (typeof window.initResumen === 'function') {
      window.initResumen();
    }
    if (typeof window.renderPptoDia === 'function') {
      window.renderPptoDia();
    }

    // Mostrar badge de última actualización
    const badge = document.getElementById('lastUpdateBadge');
    if (badge) {
      const ts = new Date(meta.generado).toLocaleString('es-CO');
      badge.textContent = `Actualizado: ${ts}`;
      badge.style.display = 'inline-block';
    }

    console.log(`📊 Dashboard — Corte: ${meta.corte} | ${g.ped} pedidos | $${(g.fac/1e6).toFixed(1)}M`);
  }

  // ── Inicializar cuando el DOM esté listo ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadData().then(applyData);
    });
  } else {
    loadData().then(applyData);
  }

})();
