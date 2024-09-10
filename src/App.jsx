import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState({
    // submitted : false,
    nameError : false,
    nameErrorText : '',
    numberError : false,
    numberErrorText : '',
    monthError : false,
    yearError : false,
    dateError : false,
    dateErrorText : '',
    cvcError : false,
    cvcErrorText : '',
  });

  const [display, setDisplay] = useState({
    name : 'Jane Appleseed',
    number : '0000 0000 0000 0000',
    month : '00',
    year : '00',
    cvc : '000'
  })


  const cardRef = {
    name : useRef(),
    number : useRef(),
    month : useRef(),
    year : useRef(),
    cvc : useRef(),
  };

  const handleSubmit = () => {
    const lettersRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^[0-9\s]+$/;
    const numberRegexAlone = /^[0-9\s]+$/;

    let errors = {
        nameError : false,
        nameErrorText : '',
        numberError : false,
        numberErrorText : '',
        monthError : false,
        yearError : false,
        dateError : false,
        dateErrorText : '',
        cvcError : false,
        cvcErrorText : '',
    }

    // setSubmitted(false);

    //name validation
    if (cardRef.name.current.value.trim() === '') {
        errors.nameError = true;
        errors.nameErrorText = 'Can’t be blank';
        // setState({...state, nameError : true, nameErrorText : 'Cant be blank'});
    } else if (!lettersRegex.test(cardRef.name.current.value.trim())) {
        errors.nameError = true;
        errors.nameErrorText = 'Wrong format, letters only';
        // setState({...state, nameError : true, nameErrorText : 'Wrong format, letters only'});
    }

    //Number Validation
    if (cardRef.number.current.value.trim() === '') {
        errors.numberError = true;
        errors.numberErrorText = 'Can’t be blank';
        // setState({...state, numberError : true, numberErrorText : 'Cant be blank'});
    } else if (!numberRegex.test(cardRef.number.current.value.trim())) {
        errors.numberError = true;
        errors.numberErrorText = 'Wrong format, numbers only';
        // setState({...state, numberError : true, numberErrorText : 'Wrong format, numbers only'});
    } else if (cardRef.number.current.value.length !== 19) {
        errors.numberError = true;
        errors.numberErrorText = 'It must be 16 digits';
        // setState({...state, numberError : true, numberErrorText : 'It must be 16 digits'});
    }

    //month validation
    if (cardRef.month.current.value.trim() === '') {
        errors.monthError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Can’t be blank';
    } else if (!numberRegexAlone.test(cardRef.month.current.value.trim())) {
        errors.monthError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Wrong format, numbers only';
    } else if (cardRef.month.current.value.length !== 2) {
        errors.monthError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Input must be 2 values';
    } else if ((cardRef.month.current.value.trim() < 1) || (cardRef.month.current.value.trim() > 12)) {
        errors.monthError = true;
        errors.dateError = true;
        errors.dateErrorText = "Month can't be greater than 12 or less than 1";
    }

    //year validation 
    if (cardRef.year.current.value.trim() === '') {
        errors.yearError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Can’t be blank';
    } else if (!numberRegexAlone.test(cardRef.year.current.value.trim())) {
        errors.yearError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Wrong format, numbers only';
    } else if (cardRef.year.current.value.length !== 2) {
        errors.yearError = true;
        errors.dateError = true;
        errors.dateErrorText = 'Input must be 2 values';
    }

    //cvc validation
    if (cardRef.cvc.current.value.trim() === '') {
        errors.cvcError = true;
        errors.cvcErrorText = 'Can’t be blank';
    } else if (!numberRegexAlone.test(cardRef.cvc.current.value.trim())) {
        errors.cvcError = true;
        errors.cvcErrorText = 'Wrong format, numbers only';
    } else if (cardRef.cvc.current.value.length !== 3) {
        errors.cvcError = true;
        errors.cvcErrorText = 'Input must be 3 values';
    }

    // setState({...state, ...errors})
    setState((prevState) => ({
        ...prevState,
        ...errors,
      }));


    if (
        (cardRef.name.current.value.trim() === '') ||
        (!lettersRegex.test(cardRef.name.current.value.trim())) ||
        (cardRef.number.current.value.trim() === '') ||
        (!numberRegex.test(cardRef.number.current.value.trim())) ||
        (cardRef.number.current.value.length !== 19) ||
        (cardRef.month.current.value.trim() === '') ||
        (!numberRegexAlone.test(cardRef.month.current.value.trim())) ||
        (cardRef.month.current.value.length !== 2) ||
        ((cardRef.month.current.value.trim() < 1) || (cardRef.month.current.value.trim() > 12)) ||
        (cardRef.year.current.value.trim() === '') ||
        (!numberRegexAlone.test(cardRef.year.current.value.trim())) ||
        (cardRef.year.current.value.length !== 2) ||
        (cardRef.cvc.current.value.trim() === '') ||
        (!numberRegexAlone.test(cardRef.cvc.current.value.trim())) ||
        (cardRef.cvc.current.value.length !== 3)

        ) {
            return;
        }

        //or better still
        // if (
        //     errors.nameError ||
        //     errors.numberError ||
        //     errors.monthError ||
        //     errors.yearError ||
        //     errors.cvcError
        //   ) {
        //     return;
        //   }

        setSubmitted(true);
        setDisplay({
            ...display,
             name : cardRef.name.current.value,
             number : cardRef.number.current.value,
             month : cardRef.month.current.value,
             year : cardRef.year.current.value,
             cvc : cardRef.cvc.current.value
        });

    // setSubmitted(!submitted);
  };

//   const handleDismiss = () => {
//     setSubmitted(false)
//   }

  const formatCardNumber = (value) => {
    // Remove existing spaces and store only digits
    const digitsOnly = value.replace(/\s/g, '');

    // Add spaces every four characters
    const formattedValue = digitsOnly.replace(/(.{4})/g, '$1 ');

    return formattedValue.trim(); // Trim to remove leading/trailing spaces
  } 

    const inputCardNumber = (event) => {
        // Get the current value of the input
        const inputValue = event.target.value;

        // Get the formatted value
        const formattedCardNumber = formatCardNumber(inputValue);

        // Update the displayed value in the input field
        cardRef.number.current.value = formattedCardNumber;
    }

  return (
    <>
      <main>
        <div className="container">
          <div className="empty">
              <div className="front-card cards">
                  <div className="inner">
                      <div className="circle">
                          <span></span>
                          <span></span>
                      </div>
                      <div className="num">
                        {display.number}
                      </div>
                      <div className="below">
                          <p>{display.name}</p>
                          <h6>{display.month}/{display.year}</h6>
                      </div>
                  </div>
              </div>
              <div className="back-card">
                  <p>{display.cvc}</p>
              </div>
          </div>
          <div className="filled">
            {!submitted ? (
              <div className="card">
                  <form className="top form">
                      <h5>CARDHOLDER NAME</h5>
                      <input 
                        ref={cardRef.name} 
                        className={`card-name ${state.nameError ? 'active' : ''}`} 
                        type="text" 
                        placeholder="e.g. Jane Appleseed" 
                      />
                      {state.nameError && <p className="top-errors errors">{state.nameErrorText}</p>}
                  </form>
                  <form className="middle form">
                      <h5>card number</h5>
                      <input 
                        onInput={inputCardNumber} 
                        ref={cardRef.number} 
                        className={`card-number ${state.numberError ? 'active' : ''}`} 
                        type="text" 
                        placeholder="e.g. 1234 5678 9123 0000" 
                        maxLength={19} 
                      />
                      {state.numberError && <p className="middle-errors errors">{state.numberErrorText}</p>}
                  </form>
                  <form className="last form">
                      <div className="month-year">
                          <h5>exp. date (mm/yy)</h5>
                          <div className="inputs">
                              <input 
                                ref={cardRef.month} 
                                className={`card-month ${state.monthError ? 'active' : ''}`} 
                                type="text" 
                                placeholder="MM" 
                                maxLength={2}
                              />
                              <input 
                                ref={cardRef.year} 
                                className={`card-year ${state.yearError ? 'active' : ''}`}
                                type="text" 
                                placeholder="YY" 
                                maxLength={2} 
                              />
                          </div>
                          {state.dateError && <p className="errors ">{state.dateErrorText}</p>}
                      </div>
                      <div className="cvc">
                          <h5>CVC</h5>
                          <input 
                            ref={cardRef.cvc} 
                            className={`cvc-number ${state.cvcError ? 'active' : ''}`} 
                            type="text" 
                            placeholder="e.g. 123" 
                            maxLength={3} 
                          />
                          {state.cvcError && <p className="errors ">{state.cvcErrorText}</p>}
                      </div>
                  </form>
                  <button onClick={handleSubmit} className="submit">Confirm</button>
              </div>
            ) : (
              <div className="card submitted-card">
                  <div className="tick">
                      <img src="/icon-complete.svg" alt="done" />
                  </div>
                  <h1>thank you!</h1>
                  <p>We've added your card details</p>
                  <button onClick={() => setSubmitted(false)}>Continue</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default App

//LEGEND.DEV coded this



































//below is a more concise and senior dev way of writing the above code



// import { useState, useRef } from 'react';
// import './App.css';

// function App() {
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [display, setDisplay] = useState({
//     name: 'Jane Appleseed',
//     number: '0000 0000 0000 0000',
//     month: '00',
//     year: '00',
//     cvc: '000',
//   });

//   const cardRef = {
//     name: useRef(),
//     number: useRef(),
//     month: useRef(),
//     year: useRef(),
//     cvc: useRef(),
//   };

//   const validateField = (field, value, regex, length, errorMessage) => {
//     if (!value.trim()) return `${field} can’t be blank`;
//     if (!regex.test(value)) return errorMessage;
//     if (length && value.length !== length) return `${field} must be ${length} digits`;
//     return '';
//   };

//   const handleSubmit = () => {
//     const validationErrors = {
//       nameError: validateField('Name', cardRef.name.current.value, /^[a-zA-Z\s]+$/, null, 'Wrong format, letters only'),
//       numberError: validateField('Number', cardRef.number.current.value, /^[0-9\s]+$/, 19, 'Wrong format, numbers only'),
//       monthError: validateField('Month', cardRef.month.current.value, /^[0-9]{2}$/, 2, 'Wrong format, numbers only'),
//       yearError: validateField('Year', cardRef.year.current.value, /^[0-9]{2}$/, 2, 'Wrong format, numbers only'),
//       cvcError: validateField('CVC', cardRef.cvc.current.value, /^[0-9]{3}$/, 3, 'Wrong format, numbers only'),
//     };

//     if (Object.values(validationErrors).some(Boolean)) {
//       setErrors(validationErrors);
//       return;
//     }

//     setSubmitted(true);
//     setDisplay({
//       name: cardRef.name.current.value,
//       number: cardRef.number.current.value,
//       month: cardRef.month.current.value,
//       year: cardRef.year.current.value,
//       cvc: cardRef.cvc.current.value,
//     });
//   };

//   const formatCardNumber = (value) =>
//     value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();

//   const inputCardNumber = (event) => {
//     cardRef.number.current.value = formatCardNumber(event.target.value);
//   };

//   return (
//     <main>
//       <div className="container">
//         <div className="empty">
//           <div className="front-card cards">
//             <div className="inner">
//               <div className="circle">
//                 <span></span><span></span>
//               </div>
//               <div className="num">{display.number}</div>
//               <div className="below">
//                 <p>{display.name}</p>
//                 <h6>{display.month}/{display.year}</h6>
//               </div>
//             </div>
//           </div>
//           <div className="back-card">
//             <p>{display.cvc}</p>
//           </div>
//         </div>
//         <div className="filled">
//           {!submitted ? (
//             <div className="card">
//               <form className="top form">
//                 <h5>CARDHOLDER NAME</h5>
//                 <input 
//                   ref={cardRef.name} 
//                   className={`card-name ${errors.nameError ? 'active' : ''}`} 
//                   type="text" 
//                   placeholder="e.g. Jane Appleseed" 
//                 />
//                 {errors.nameError && <p className="top-errors errors">{errors.nameError}</p>}
//               </form>
//               <form className="middle form">
//                 <h5>card number</h5>
//                 <input 
//                   onInput={inputCardNumber} 
//                   ref={cardRef.number} 
//                   className={`card-number ${errors.numberError ? 'active' : ''}`} 
//                   type="text" 
//                   placeholder="e.g. 1234 5678 9123 0000" 
//                   maxLength={19} 
//                 />
//                 {errors.numberError && <p className="middle-errors errors">{errors.numberError}</p>}
//               </form>
//               <form className="last form">
//                 <div className="month-year">
//                   <h5>exp. date (mm/yy)</h5>
//                   <div className="inputs">
//                     <input 
//                       ref={cardRef.month} 
//                       className={`card-month ${errors.monthError ? 'active' : ''}`} 
//                       type="text" 
//                       placeholder="MM" 
//                       maxLength={2}
//                     />
//                     <input 
//                       ref={cardRef.year} 
//                       className={`card-year ${errors.yearError ? 'active' : ''}`}
//                       type="text" 
//                       placeholder="YY" 
//                       maxLength={2} 
//                     />
//                   </div>
//                   {errors.monthError && <p className="errors">{errors.monthError}</p>}
//                   {errors.yearError && <p className="errors">{errors.yearError}</p>}
//                 </div>
//                 <div className="cvc">
//                   <h5>CVC</h5>
//                   <input 
//                     ref={cardRef.cvc} 
//                     className={`cvc-number ${errors.cvcError ? 'active' : ''}`} 
//                     type="text" 
//                     placeholder="e.g. 123" 
//                     maxLength={3} 
//                   />
//                   {errors.cvcError && <p className="errors">{errors.cvcError}</p>}
//                 </div>
//               </form>
//               <button onClick={handleSubmit} className="submit">Confirm</button>
//             </div>
//           ) : (
//             <div className="card submitted-card">
//               <div className="tick">
//                 <img src="/icon-complete.svg" alt="done" />
//               </div>
//               <h1>thank you!</h1>
//               <p>We've added your card details</p>
//               <button onClick={() => setSubmitted(false)}>Continue</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;
