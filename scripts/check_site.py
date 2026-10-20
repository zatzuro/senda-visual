#!/usr/bin/env python3
"""Verificaciones estáticas de SENDA Visual. Estándar Python sin dependencias."""
from __future__ import annotations
from pathlib import Path
import re
import sys
ROOT=Path(__file__).resolve().parent.parent
FILES={"README.md","source.json",".nojekyll","index.html","annual.html","monthly.html","static/style.css","static/annual.css","static/monthly.css","static/demo.js","scripts/check_site.py"}
actual={p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file() and ".git" not in p.parts}
assert actual == FILES, f"Archivos fuera de allowlist: {sorted(actual-FILES)}; faltantes: {sorted(FILES-actual)}"
for name in ("index","annual","monthly"):
    html=(ROOT / (name+".html")).read_text(encoding="utf-8")
    assert "DEMOSTRACIÓN VISUAL" in html
    assert 'src="./static/demo.js"' in html
    assert not re.search(r'src="/static/|href="/static/|src="/api/',html)
    assert not re.search(r'(app|annual|monthly|admin-csrf)\.js',html)
    assert (ROOT/"static"/(name+".css" if name != "index" else "style.css")).exists()
js=(ROOT/"static/demo.js").read_text(encoding="utf-8")
assert not re.search(r'\bfetch\s*\(|\bXMLHttpRequest\b|/api/|\blocalStorage\b|\bsessionStorage\b',js), "La demo no debe contactar backend ni persistir datos"
assert 'datos ficticios' in js and 'disabled=true' in js
for path in ROOT.rglob("*"):
    if path.is_file():
        assert path.stat().st_size < 100_000, "Archivo inesperadamente grande"
print("QA estático: OK. Solo demo sintética, sin backend ni archivos ajenos.")
