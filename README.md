# SENDA Visual — demostración pública y estática

Este repositorio es el sitio de visualización de [SENDA](https://github.com/zatzuro/senda-core), cuyo motor y datos permanecen en un repositorio privado.

## Política permanente de sincronización
1. `senda-core` es la fuente de verdad de la interfaz y la aplicación; `senda-visual` exhibe únicamente representaciones estáticas y seguras con datos sintéticos.
2. Cada cambio **aprobado y publicado** que afecte pantallas, navegación, estructura visual o textos visibles en SENDA debe trasladarse y probarse también en este repositorio; conservar SHA de origen y SHA de visual.
3. Los cambios exclusivos de backend, modelos, cálculos, bases, autenticación o despliegue privado no se copian al sitio público. Cuando alteren el comportamiento visible, actualizar solo la simulación correspondiente (con etiqueta explícita de demostración).
4. Prohibido copiar datos reales, secretos, credenciales, URLs privadas con tokens, respaldos, artefactos compilados y código de backend. Las páginas no ejecutan el motor Python/DuckDB y no son SENDA en producción.
5. La automatización entre repositorios requiere una credencial de alcance mínimo autorizada y configurada como secreto GitHub Actions; no asumir acceso ni crear gasto. Hasta entonces, la sincronización es **manual y obligatoria en cada release visual**.
6. Publicar la vista solo tras QA estático, seguridad, correspondencia con origen y revisión de permisos de Pages. Toda publicación debe identificarse con commit comprobable.

## Acceso
Una vez habilitado GitHub Pages en **Settings → Pages**, seleccionando **Deploy from a branch**, rama `main` y `/(root)`, la URL prevista es `https://zatzuro.github.io/senda-visual/`.

## Límite
Esta es una **demostración visual de solo lectura con datos sintéticos**; no permite importación, aprendizaje, confirmación de presupuestos ni escritura de registros reales.