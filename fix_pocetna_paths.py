from pathlib import Path

p = Path(r"stranice\pocetna_stranica.html")
text = p.read_text(encoding='utf-8')

text = text.replace('<link rel="stylesheet" href="css/stil.css">', '<link rel="stylesheet" href="../css/stil.css">')
text = text.replace("background: url('../slike_cvecara/slike ponuda/background_white.jpg') no-repeat center center/cover;", "background: url('../slike_cvecara/slike%20ponuda/background_white.jpg') no-repeat center center/cover;")
text = text.replace('src="slike_cvecara/', 'src="../slike_cvecara/')
text = text.replace('<script src="js/funkcije.js"></script>', '<script src="../js/funkcije.js"></script>')

p.write_text(text, encoding='utf-8')
