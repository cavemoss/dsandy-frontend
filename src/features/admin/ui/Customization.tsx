'use client'; // This is a client component for interactivity

import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';

export default function LogoCreator() {
  const fonts = [
    'ABeeZee',
    'ADLaM Display',
    'Aguafina Script',
    'Ahmed',
    'Akaya Kanadaka',
    'Akronim',
    'Aladin',
    'Alan Sans',
    'Alata',
    'Alatsi',
    'Albert Sans',
    'Aldrich',
    'Alef',
    'Alegreya',
    'Alegreya SC',
    'Alegreya Sans',
    'Alegreya Sans SC',
    'Aleo',
    'Alex Brush',
    'Alexandria',
    'Alfa Slab One',
    'Alice',
    'Alike',
    'Alike Angular',
    'Alkalami',
    'Alkatra',
    'Allan',
    'Allerta',
    'Allerta Stencil',
    'Allison',
    'Allura',
    'Almarai',
    'Almendra',
    'Almendra Display',
    'Almendra SC',
    'Alumni Sans',
    'Alumni Sans Collegiate One',
    'Alumni Sans Inline One',
    'Alumni Sans Pinstripe',
    'Alumni Sans SC',
    'Amarante',
    'Amaranth',
    'Amatic SC',
    'Amethysta',
    'Amiko',
    'Amiri',
    'Amiri Quran',
    'Amita',
    'Anaheim',
    'Ancizar Sans',
    'Ancizar Serif',
    'Andada Pro',
    'Andika',
    'Anek Bangla',
    'Anek Devanagari',
    'Anek Gujarati',
    'Anek Gurmukhi',
    'Anek Kannada',
    'Anek Latin',
    'Anek Malayalam',
    'Anek Odia',
    'Anek Tamil',
    'Anek Telugu',
    'Angkor',
    'Annapurna SIL',
    'Annie Use Your Telescope',
    'Anonymous Pro',
    'Antic',
    'Antic Didone',
    'Antic Slab',
    'Anton',
    'Anton SC',
    'Antonio',
    'Anuphan',
    'Anybody',
    'Aoboshi One',
    'Arapey',
    'Arbutus',
    'Arbutus Slab',
    'Architects Daughter',
    'Archivo',
    'Archivo Black',
    'Archivo Narrow',
    'Are You Serious',
    'Aref Ruqaa',
    'Aref Ruqaa Ink',
    'Arima',
    'Arimo',
    'Arizona',
    'Armata',
    'Arsenal',
    'Arsenal SC',
    'Artifika',
    'Arvo',
    'Arya',
    'Asap',
    'Asap Condensed',
    'Asar',
    'Asimovian',
    'Asset',
    'Assistant',
    'Asta Sans',
    'Astloch',
    'Asul',
    'Athiti',
    'Atkinson Hyperlegible',
    'Atkinson Hyperlegible Mono',
    'Atkinson Hyperlegible Next',
    'Atma',
    'Atomic Age',
    'Aubrey',
    'Audiowide',
    'Autour One',
    'Average',
    'Average Sans',
    'Averia Gruesa Libre',
    'Averia Libre',
    'Averia Sans Libre',
    'Averia Serif Libre',
    'Azeret Mono',
    'B612',
    'B612 Mono',
    'BBH Sans Bartle',
    'BBH Sans Bogle',
    'BBH Sans Hegarty',
    'BIZ UDGothic',
    'BIZ UDMincho',
    'BIZ UDPGothic',
    'BIZ UDPMincho',
    'Babylonica',
    'Bacasime Antique',
    'Bad Script',
    'Badeen Display',
    'Bagel Fat One',
    'Bahiana',
    'Bahianita',
    'Bai Jamjuree',
    'Bakbak One',
    'Ballet',
    'Baloo 2',
    'Baloo Bhai 2',
    'Baloo Bhaijaan 2',
    'Baloo Bhaina 2',
    'Baloo Chettan 2',
    'Baloo Da 2',
    'Baloo Paaji 2',
    'Baloo Tamma 2',
    'Baloo Tammudu 2',
    'Baloo Thambi 2',
    'Balsamiq Sans',
    'Balthazar',
    'Bangers',
    'Barlow',
    'Barlow Condensed',
    'Barlow Semi Condensed',
    'Barriecito',
    'Barrio',
    'Basic',
    'Baskervville',
    'Baskervville SC',
    'Battambang',
    'Baumans',
    'Bayon',
    'Be Vietnam Pro',
    'Beau Rivage',
    'Bebas Neue',
    'Beiruti',
    'Bitter',
    'Black And White Picture',
    'Black Han Sans',
    'Black Ops One',
    'Blaka',
    'Blaka Hollow',
    'Blaka Ink',
    'Blinker',
    'Bodoni Moda',
    'Bodoni Moda SC',
    'Bokor',
    'Boldonse',
    'Bona Nova',
    'Bona Nova SC',
    'Bonbon',
    'Bonheur Royale',
    'Boogaloo',
    'Borel',
    'Bowlby One',
    'Bowlby One SC',
    'Braah One',
    'Brawler',
    'Bree Serif',
    'Bricolage Grotesque',
    'Bruno Ace',
    'Bruno Ace SC',
    'Brygada 1918',
    'Bubblegum Sans',
    'Bubbler One',
    'Buda',
    'Buenard',
    'Bungee',
    'Bungee Hairline',
    'Bungee Inline',
    'Bungee Outline',
    'Bungee Shade',
    'Bungee Spice',
    'Bungee Tint',
    'Butcherman',
    'Butterfly Kids',
    'Bytesized',
    'Cabin',
    'Cabin Condensed',
    'Cabin Sketch',
    'Cactus Classical Serif',
    'Caesar Dressing',
    'Cagliostro',
    'Cairo',
    'Cairo Play',
    'Cal Sans',
    'Caladea',
    'Calistoga',
    'Calligraffitti',
    'Cambay',
    'Cambo',
    'Candal',
    'Cantarell',
    'Cantata One',
    'Cantora One',
    'Caprasimo',
    'Capriola',
    'Caramel',
    'Carattere',
    'Cardo',
    'Carlito',
    'Carme',
    'Carrois Gothic',
    'Carrois Gothic SC',
    'Carter One',
    'Cascadia Code',
    'Cascadia Mono',
    'Castoro',
    'Castoro Titling',
    'Catamaran',
    'Caudex',
    'Caveat',
    'Caveat Brush',
    'Cedarville Cursive',
    'Ceviche One',
    'Chakra Petch',
    'Changa',
    'Changa One',
    'Chango',
    'Charis SIL',
    'Charm',
    'Charmonman',
    'Chathura',
    'Chau Philomene One',
    'Chela One',
    'Chelsea Market',
    'Chenla',
  ]; // Partial list; visit https://fonts.google.com to copy the full ~1,894 font families and paste them here alphabetically for completeness.

  const [selectedFont, setSelectedFont] = useState<string>(fonts[0] || '');
  const [text, setText] = useState<string>('Your Shop Name');
  const [bold, setBold] = useState<boolean>(false);
  const [italic, setItalic] = useState<boolean>(false);
  const [underline, setUnderline] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(48);
  const [textColor, setTextColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#f0f0f0');
  const previewRef = useRef<HTMLDivElement>(null);

  // Dynamically load the selected font with common variants
  useEffect(() => {
    if (selectedFont) {
      const fontUrl = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
        / /g,
        '+'
      )}:ital,wght@0,400;0,700;1,400;1,700&display=swap`;
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [selectedFont]);

  // Download preview as PNG
  const handleDownload = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement('a');
      link.download = 'shop-logo.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Compute text decoration
  const textDecoration = [];
  if (underline) textDecoration.push('underline');
  if (strikethrough) textDecoration.push('line-through');
  const textDecoStyle = textDecoration.length > 0 ? textDecoration.join(' ') : 'none';

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create Your Shop Logo</h1>

      <label htmlFor="font-select">Select Google Font:</label>
      <select
        id="font-select"
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <label htmlFor="text-input">Enter Text:</label>
      <input
        id="text-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Text Styles:</label>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <label>
          <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} />
          Bold
        </label>
        <label>
          <input type="checkbox" checked={italic} onChange={(e) => setItalic(e.target.checked)} />
          Italic
        </label>
        <label>
          <input type="checkbox" checked={underline} onChange={(e) => setUnderline(e.target.checked)} />
          Underline
        </label>
        <label>
          <input type="checkbox" checked={strikethrough} onChange={(e) => setStrikethrough(e.target.checked)} />
          Strikethrough
        </label>
      </div>

      <label htmlFor="font-size">Font Size (px):</label>
      <input
        id="font-size"
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label htmlFor="text-color">Text Color:</label>
      <input
        id="text-color"
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label htmlFor="bg-color">Background Color:</label>
      <input
        id="bg-color"
        type="color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
        style={{ width: '100%', marginBottom: '20px' }}
      />

      <div>
        <h2>Preview:</h2>
        <div
          ref={previewRef}
          style={{
            fontFamily: selectedFont || 'sans-serif',
            fontWeight: bold ? 700 : 400,
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: textDecoStyle,
            fontSize: `${fontSize}px`,
            color: textColor,
            textAlign: 'center',
            padding: '20px',
            backgroundColor: bgColor,
            border: '1px solid #ccc',
          }}
        >
          {text || 'Preview Text'}
        </div>
      </div>

      <button onClick={handleDownload} style={{ marginTop: '20px' }}>
        Download Logo as PNG
      </button>
    </div>
  );
}
