import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
    const [digits, setDigits] = useState('');
    const [translation, setTranslation] = useState('Entrez un nombre');

    useEffect(() => {
        if (digits === '') {
            setTranslation('Entrez un nombre');
        } else if (parseInt(digits) === 0) {
            setTranslation('zéro');
        } else if (parseInt(digits) > 9007199254740992) {
          setTranslation('Nombre trop grand');
        } else {
            const chunked = chunkString(reverseString(parseInt(digits)), 3);

            let actualTranslation = '';
            for (let chunkPosition = 0; chunkPosition < chunked.length; chunkPosition++) {
                const chunk = chunked[chunkPosition];
                const reversedChunk = reverseString(chunk);
                let position = chunk.length;
                let chunkTranslation = '';
                if (parseInt(chunk) === 0) {
                    chunkTranslation = '';
                } else {
                    while (position--) {
                        let digit = reversedChunk.charAt(position);
                        chunkTranslation += digitToText(digit, position, reversedChunk, chunkTranslation, chunkPosition);
                    }

                    if (chunkPosition !== 0) {
                        const thousandth = getThousandth(chunkPosition);
                        const append = ((chunkTranslation !== '' && chunkTranslation[chunkTranslation.length - 1] !== '-') ? '-' : '') + thousandth + ((actualTranslation !== '') ? '-' : '');
                        chunkTranslation += append;
                    }
                }

                actualTranslation = chunkTranslation += actualTranslation;
            }
            const translationLength = actualTranslation.length;
            if (actualTranslation[translationLength - 1] === '-') actualTranslation = actualTranslation.substring(0, translationLength - 1);

            setTranslation(actualTranslation);
        }
    }, [digits]);

    const handleChange = (event) => {
        setDigits(event.target.value);
    };

    const reverseString = (string) => {
        return (string.toString()).split("").reverse().join("");
    };

    const getThousandth = (position) => {
        let thousandth;
        switch (position) {
            case 1:
                thousandth = 'mille';
                break;
            case 2:
                thousandth = 'million';
                break;
            case 3:
                thousandth = 'milliard';
                break;
            case 4:
                thousandth = 'billion';
                break;
            case 5:
                thousandth = 'trillion';
                break;
            default:
                thousandth = '';
        }
            return thousandth;
    };

    const digitToText = (digit, position, reversedDigits, actualTranslation, chunkPosition) => {
        let text = '';
        switch (position) {
            case 0:
                const nextDigit = parseInt(reversedDigits.charAt(position+1));
                switch (parseInt(digit)) {
                    case 0:
                        text = '';
                        break;
                    case 1:
                        if (nextDigit && (nextDigit !== 0 && nextDigit !== 1 && nextDigit !== 8 && nextDigit !== 9)) text = 'et-';
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text += 'onze';
                        } else if (chunkPosition === 1) {
                            text += '';
                        } else text += 'un';
                        break;
                    case 2:
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text = 'douze';
                        } else text = 'deux';
                        break;
                    case 3:
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text = 'treize';
                        } else text = 'trois';
                        break;
                    case 4:
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text = 'quatorze';
                        } else text = 'quatre';
                        break;
                    case 5:
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text = 'quinze';
                        } else text = 'cinq';
                        break;
                    case 6:
                        if (nextDigit && (nextDigit === 1 || nextDigit === 7 || nextDigit === 9)) {
                            text = 'seize';
                        } else text = 'six';
                        break;
                    case 7:
                        text = 'sept';
                        break;
                    case 8:
                        text = 'huit';
                        break;
                    case 9:
                        text = 'neuf';
                        break;
                    default:
                        text = '';
                }
                break;
            case 1:
                const lastDigit = parseInt(reversedDigits.charAt(position-1));
                switch (parseInt(digit)) {
                    case 0:
                        text = '';
                        break;
                    case 1:
                        if (lastDigit && (lastDigit > 0 && lastDigit < 7)) {
                            text = '';
                        } else text = 'dix-';
                        break;
                    case 2:
                        text = 'vingt-';
                        break;
                    case 3:
                        text = 'trente-';
                        break;
                    case 4:
                        text = 'quarante-';
                        break;
                    case 5:
                        text = 'cinquante-';
                        break;
                    case 6:
                        text = 'soixante-';
                        break;
                    case 7:
                        if (lastDigit && (lastDigit > 0 && lastDigit < 7)) {
                            text = 'soixante-';
                        } else text = 'soixante-dix-';
                        break;
                    case 8:
                        text = 'quatre-vingt-';
                        break;
                    case 9:
                        if (lastDigit && (lastDigit > 0 && lastDigit < 7)) {
                            text = 'quatre-vingt-';
                        } else text = 'quatre-ving-dix-';
                        break;
                    default:
                        text = '';
                }
                break;
            case 2:
                switch (parseInt(digit)) {
                    case 0:
                        text = '';
                        break;
                    case 1:
                        text = 'cent-';
                        break;
                    case 2:
                        text = 'deux-cent-';
                        break;
                    case 3:
                        text = 'trois-cent-';
                        break;
                    case 4:
                        text = 'quatre-cent-';
                        break;
                    case 5:
                        text = 'cinq-cent-';
                        break;
                    case 6:
                        text = 'six-cent-';
                        break;
                    case 7:
                        text = 'sept-cent-';
                        break;
                    case 8:
                        text = 'huit-cent-';
                        break;
                    case 9:
                        text = 'neuf-cent-';
                        break;
                    default:
                        text = '';
                }
                break;
            default:
                text = '';
        }
        return text;
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <input type="number" value={digits} onChange={handleChange}/>
                <p className="App-translation">{translation}</p>
            </header>
        </div>
    );
};

const chunkString = (str, len) => {
    const _size = Math.ceil(str.length/len),
        _ret  = new Array(_size);
    let _offset;

    for(let _i=0; _i<_size; _i++) {
        _offset = _i * len;
        _ret[_i] = (str.substring(_offset, _offset + len)).split("").reverse().join("");
    }

    return _ret;
};
export default App;
