import './App.css';
import { useState, useEffect, useContext } from 'react';
import { newLoseContext } from './context/losecontextprovider';
import { newWinContext } from './wincontextprovider/wincontextprovider';
import { coinContext } from './coins/Coincontext';

function App() {
  const [display, setDisplay] = useState<{ [key: string]: boolean }>({});
  const [executed, setExecuted] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string[]>([]);
  const [clickedLetters, setClickedLetters] = useState<Set<string>>(new Set());
  const [part, setPart] = useState<number>(0);
  const coinCont= useContext(coinContext);
  const loseContext = useContext(newLoseContext);
  const winContext = useContext(newWinContext);
  if(!coinCont) {
    throw new Error("coins failed");
  }
  if (!loseContext) {
    throw new Error("lose failed");
  }
  if (!winContext) {
    throw new Error("win failed");
  }
  const { coins, setCoins } = coinCont;
  const { lose, setLose } = loseContext;
  const { win, setWin } = winContext;
  let update = false;

  useEffect(() => {
    if (executed) return;
    const words = ["language", "hangman", "axel"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord.split(""));
    setExecuted(true);
  }, [executed]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const isLetter = (value: string): boolean => {
    return selectedWord.includes(value);
  };

  const handleLetterClick = (value: string) => {
    if (clickedLetters.has(value)) return;

    setClickedLetters(prev => new Set([...prev, value]));
//ugh
    if (isLetter(value)) {
      setDisplay(prevDisplay => ({
        ...prevDisplay,
        [value]: true,
      }));

      const revealedLetters = Object.keys(display).filter(letter => display[letter]).length;
      if (revealedLetters + 1 === new Set(selectedWord).size) { 
        update = true;
        setTimeout(()=>{
          setWin(true);
          updated();
        },200)
      }
    } else {
      if (part <= 9) {
        setPart(prevPart => prevPart + 1);
      } else {
        update = true;
        setTimeout(()=>{
        setLose(true);
        updated();
      },200)
      }
    }

  };

const updated = ():void => {
return setCoins((prevCoins) => lose ? prevCoins - 100 : prevCoins + 100);

}
  return (
    <>
      <div className="figure-container">
        <svg height="300px" width="200px" className="parts">
          {part >= 1 && <line x1="60" y1="20" x2="140" className="figure-part" y2="20" />}
          {part >= 2 && <line x1="140" y1="20" x2="140" className="figure-part" y2="50" />}
          {part >= 3 && <line x1="60" y1="20" x2="60" className="figure-part" y2="250" />}
          {part >= 4 && <line x1="20" y1="250" x2="100" className="figure-part" y2="250" />}
          {part >= 5 && <circle cx="140" cy="70" r="20" className="figure-part" />}
          {part >= 6 && <line x1="140" y1="90" x2="140" y2="170" className="figure-part" />}
          {part >= 7 && <line x1="140" y1="120" x2="110" y2="100" className="figure-part" />}
          {part >= 8 && <line x1="140" y1="120" x2="170" y2="100" className="figure-part" />}
          {part >= 9 && <line x1="140" y1="170" x2="120" y2="200" className="figure-part" />}
          {part >= 10 && <line x1="140" y1="170" x2="160" y2="200" className="figure-part" />}
        </svg>

        <div className="wrongLetters">Wrong letters: {[...clickedLetters].filter(letter => !new Set(selectedWord).has(letter)).join(", ")}</div>
      </div>

      <div className="container-right">
        <h1>Hangman</h1>
        <div className="word">
          {executed &&
            selectedWord.map((value, index) => (
              <div key={index} id={display[value] ? 'letter-visible' : 'letter-none'}>
                {display[value] ? value : null}
              </div>
            ))}
        </div>
        <div className="keyboard">
          {alphabet.map((value) => (
            <div
              key={value}
              onClick={() => !lose && !win ? handleLetterClick(value) : null}
              id="table"
              style={{
                opacity: clickedLetters.has(value) ? 0.5 : 1,
                pointerEvents: clickedLetters.has(value) ? "none" : "auto",
              }}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="status">{lose ? "U losed" : ""}{win ? "U won" : ""}</div>
        <div className="coins">Coins: {lose || win ? coins : coins} </div>
      </div>
    </>
  );
}

export default App;
