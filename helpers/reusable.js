
// Input: ['c1','c2','c3']
// Output: 'c1 c2 c3'
export function concatStrings(strArr = []) {
  return strArr.reduce((acc, cur, arr) => {
    return acc.concat(` ${cur}`);
  }, '');
}

// Input: 'helloThereMister'
// Output: 'Hello There Mister'
export function camelToSentenceCase(ccString) {
  const sfResult = ccString.replace(/([A-Z])/g, " $1"); // sf - semi-final
  return sfResult.charAt(0).toUpperCase() + sfResult.slice(1);
}


// returns a deep copy of object
export function deepClone(original) {
  return JSON.parse(JSON.stringify(original))
}


// copy only a few keys from an object // equivalent to _.pick()
export function cloneAndPluck(sourceObject = {}, keys = []) {
  const newObject = {};
  keys.forEach((key) => {
    if (sourceObject[key] === undefined) return;
    newObject[key] = sourceObject[key]
  });
  return newObject;
};


// Input: {label1: 'value1'} (parent Obj), ['label2', 'value2'] (entry Pair Arr)
// Output: {label1: 'value1', label2: 'value2'}
export function addObjectPair(parentObj, entryPairArr) {
  const newParent = deepClone(parentObj);
  newParent[`${entryPairArr[0]}`] = entryPairArr[1]
  return newParent;
}


// Input: {label1: 'value1', label2: 'value2'}
// Output-phase1: [ 
//   ['label1': 'name'],
//   ['label2': 'John Doe']
//  ]
// Output-phase2: [
//   {
//     label: "label1",
//     value: "name"
// },
// {
//     label: "label2",
//     value: "John Doe"
// }
// ]
// performs transformation on each object-pair and returns an array.
export function transformEntries(object, transformer = pairToEntry) {
  return Object.entries(object).map((el, idx) => {
    return transformer(el, idx)
  });
}
global.x = transformEntries;
// returns transformed data from an array
export function transformArray(array, transformer) {
  return array.map((el, idx) => {
    return transformer(el, idx)
  });
}

export function isObjEmpty(obj) {
  return obj && // is it defined
    Object.entries(obj).length === 0 || // entries exists ?
    Object.values(obj).every( // check all attributes for the following checks
      attribute => (
        // Checks for attributes
        attribute === null ||
        attribute === undefined ||
        attribute === ''
        // || attribute === false // optional
      )
    )
}


// Input: ['label1', 'value1']
// Input: {label1: 'value1'}
function pairToEntry(pairArr, pairIndex) {
  return Object.fromEntries(pairArr)

}

export function genLog(label, data, background = '#78f086', padding = '0.5rem 1rem', color = '#000') {
  console.log(`%c ${label}`, `background: ${background}; padding: ${padding}; color: ${color}`, data);
}

export function removeDuplicate(list, label = 'item') {
  let result;
  if (list.length === 0) {
    result = []
  } else {

    result = list.reduce((prev, cur, arr) => {

      // Check duplicate
      const duplicateIndex = prev.findIndex((el) => el[label] === cur)

      // No Duplicate
      if (duplicateIndex === -1) {
        prev.push(
          { [label]: cur, qty: 1 }
        )
      };

      // Found Duplicate
      if (duplicateIndex >= 0) {
        prev[duplicateIndex].qty++;
      };

      return prev

    }, [])
  }

  return result;
}

export function genFormFields(objData) {
  return objData.map((el, elIdx) => {
    return {
      field: el[0],
      defaultValue: el[1],
    }
  })
}


export function checkDataType(testEl) {
  const elType = typeof (testEl)
  let result;

  if (elType === 'object') {
    // Array
    if (Array.isArray(testEl)) {
      result = 'array'
      // console.log('Array Input');
    } else if (testEl === null) {
      result = 'null'
      // console.log('Null Input');
    } else {
      result = 'object'
      // console.log('Object Input');
    }
  } else if (elType == 'undefined') {
    result = 'undefined'
    // console.log('Undefined Input');
  } else { // String & Number
    result = elType
    // console.log(elType);
  }
  return result;
}

export const replaceLastCharacter = (char, replacement, replaceLength = 1) => {
  return (char.toString()).slice(0, -replaceLength) + replacement;
};



export function mapDataToCategory(dataList = [], categories = false, filter = 'type', fallbackCtg = 'others') {


  // categories = ['purchased', 'manufactured']; 
  if (dataList && Array.isArray(dataList)) {


    const result = {}

    // create an array of all possible catagories
    const allCategories = categories ? categories.concat(fallbackCtg) : [fallbackCtg]
    allCategories.forEach(
      ctgName => result[ctgName] = []
    )


    // check if the input data list is valid & array
    if (dataList && Array.isArray(dataList)) {

      dataList.forEach(
        (dataEl, idx) => {

          // Check if categories are provided as Valid & Array
          if (categories && Array.isArray(categories) && categories.length > 0) {
            // Yes: add the matching in categories and others in fallbackCtg

            // check given categories include the Value-at-filter-key (V.A.F.K)
            categories.includes(dataEl[filter])
              // Yes: add the current item in the matching category
              ? result[dataEl[filter]].push(dataEl)
              // No: add the current item in the misc(fallbackCtg) category
              : result[fallbackCtg].push(dataEl)

          }
          else {
            // No: add every item in the fallbackCtgCategory
            result[fallbackCtg].push(dataEl)
          }
        }
      )
    }

    return result;

  } else {
    console.log(`Input is not valid`);
  }
}

export async function httpParams(apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null) {
  // export const httpParams = async (apiLink = 'http://localhost:3000/api/connect', method = 'GET', data = null) => {

  // console.log("HTTP Request Params");
  // console.log(apiLink, method);
  // console.log("data: ", data);

  const response = await fetch(apiLink, {
    method: method,
    headers: {
      'Content-Type': 'application/json' // the request won't work without specifying headers
    },
    body: data && JSON.stringify(data) // returns null (default parameter) if not defined
  })
  return response;
}

// Created by Github Copilot
// create a function to format a number to 3 digits with leading zeros
export function setDigits(num, places) {
  const zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}



// create an array of items with a prefix, separator and min-digits-of-suffix allowing to start the index from indexShift
// indexShift is the number before the first item index ( can be passed if the array needs to start from a specific index i.e indexShift +1 )
export function superArray(itemCount = 10, prefix = 'prefix', suffixDigits = 3, separator = '---', indexShift = 0) {
  const initialValue = 0;
  return Array(itemCount)
    .fill(initialValue)
    .map(
      (_, idx) => (
        `${prefix}${separator}${setDigits((indexShift + idx + 1), suffixDigits)}`
      )
    )
}



export function getIDseries(str = 'preO-0001, preA-[01,005-075,089-115(2)] ,,, preB-009[1], preC-[01-12]-sufC,preD-001') {

  return str.replaceAll(' ', '')
    .split('')
    .reduce(
      (acc, cur, idx, arr) => {
        const accCopy = Object.assign({}, acc);


        // *Indices/Letter Block
        if (cur !== ',' && cur !== '[' && cur !== ']' && cur !== '(') {

          if (accCopy.nest === 0) {
            (arr[idx - 1] === ']' || accCopy.suf.length > 0) ?
              accCopy.suf = accCopy.suf.concat(cur)
              : accCopy.pre = accCopy.pre.concat(cur);
          } else if (accCopy.nest === 1) {
            accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
          } else if (accCopy.nest === 2) {
            accCopy.idIndex.length = accCopy.idIndex.length.concat(cur)
          }
        }

        // *Repetition Block Check - Checks for repeated numbers and letters (Placing on top would stop normal repeated letters too)
        if (arr[idx - 1] === arr[idx]) { return accCopy };


        // *Digits Block / Small Brackets
        cur === '(' && accCopy.nest++
        cur === ')' && accCopy.nest--

        // *Large Brackets / IDindex Block
        if (cur === '[') {
          accCopy.nest++;
          accCopy.nest > 1 && alert('Nesting Is Not allowed');
        }
        if (cur === ']') {
          accCopy.idIndex.list = suffixTranslator(accCopy.idIndex.str); // transform idIndex.str into a range.
          accCopy.idIndex.str = ''; // reset idIndex.str
          accCopy.nest--;
        }

        // *Closing Block / Comma Block
        if (cur === ',' || idx === arr.length - 1 /* ,(idx === arr.length - 1 && cur===']') */) {
          if (accCopy.nest === 0) { // no nesting at current level => finalize the part ID
            const prefix = accCopy.pre/* .join('') */;
            const ids = accCopy.idIndex.list;
            const digits = parseInt(accCopy.idIndex.length) || 3;
            const suffix = accCopy.suf;

            (ids.length > 0)
              ? ids.forEach(itemIndex => {
                const newIdString = [prefix, setDigits(itemIndex, digits), suffix].join('')
                accCopy.result.push(newIdString.toUpperCase())
              }
              )
              : accCopy.result.push(prefix);

            accCopy.pre = '';
            accCopy.suf = '';
            accCopy.idIndex.length = '';
            accCopy.idIndex.list = [];


            // return accCopy;
          } else if (accCopy.nest === 1) {
            accCopy.idIndex.str = accCopy.idIndex.str?.concat(cur)
          } else if (accCopy.nest === 2) {
            alert('"," not allowed in between "(" and ")"')
          }
        }


        // if (idx === arr.length - 1) console.log('final result', accCopy.result);

        return accCopy;
      },
      {
        pre: '',
        suf: '',
        idIndex: {
          length: '', // length of the id index
          list: [],
          str: ''
        },
        nest: 0,
        result: []
      }
    ).result

}


// "01,005-007" - [1,5,6,7]  
function suffixTranslator(
  str = "01,005-075,089-115",
  separator = ',',
  seriesSymbol = '-'
) {
  const separated = str.split(separator); // [01,005-075,089-115] 

  const result = separated.reduce(
    (acc, cur, idx, arr) => {

      // "2-5" => 2,3,4,5 => (5-3)+1 = 4
      const curSplit = cur.split(seriesSymbol); // "005-075" => ["005","075"], "089-115" => ["089","115"]

      if (curSplit.length === 1) {
        // No series
        return [...acc, parseInt(...curSplit)]

      } else if (curSplit.length === 2) {
        // contains series //// if the string contains a dash, then it is a series
        return [
          ...acc,
          ...range(
            parseInt(curSplit[0]),
            parseInt(curSplit[1]))
        ]

      } else if (curSplit.length > 2) {
        // Multiple seriesSymbols (-) found
        alert('Multiple seriesSymbols (-) found');
      }
    }, []
  )

  return result
}



// Sequence generator function (commonly referred to as "range")
const range = (start, stop, step = 1) => Array.from(
  { length: (stop - start) / step + 1 }, // *defining the length property of the Array as Array is a special object with a length property equal to number of elements in the array
  (_, i) => start + (i * step)
);

// Find the all indices at occurrence of 'subStr' in 'str'
function findIndices(str, subStr) {
  let i = -1;
  let indices = [];
  while ((i = str.indexOf(subStr, i + 1)) >= 0) {
    indices.push(i);
  }
  return indices;
}

// merges two arrays of equal length to a single array, making pairs of elements at same index.
function mergeToPairs(arr1 = [], arr2 = []) {
  arr2.length > 0
    && arr1.length > 0
    && arr1.map(
      (leftIdx, idx) => {
        return [leftIdx, arr2[idx]]
      }
    )
}

// returns a single array with pairs of indices at occurrence of two enclosing strings
function getIndicesPairs(str = '[johny],[shahzeb]', matchStr1 = '[', matchStr2 = ']') {
  /* const leftBktIndices = findIndices(str, matchStr1); // [1, 9]
  const rightBktIndices = findIndices(str, matchStr2);// [7, 17]
  return mergeToPairs(leftBktIndices, rightBktIndices) // [[1, 7], [9, 17]]
   */
  return mergeToPairs(
    findIndices(str, matchStr1),// [0, 8]
    findIndices(str, matchStr2) // [6, 16]
  ) // [[0, 6], [8, 16]]
}

// returns the string enclosed in two enclosing strings
function getEnclosedStr(str = '', enclosersIndexPair = ['startIndex', 'endIndex']) {

  return str.substring(enclosersIndexPair[0] + 1, enclosersIndexPair[1]);

}


// returns the string enclosed in all the pairs of enclosing strings
function getEnclosedStrArr(str = '', IndexPairArray = []) {
  return IndexPairArray.map(indexPair => getEnclosedStr(str, indexPair));
}


// ? NOT USED
function isArrSorted(arrTest = []) {
  return arrTest.every(
    (num, idx, arr) => {
      return num > arr[idx - 1] || idx === 0
      // return num < arr[idx + 1] || idx === arr.length - 1 // Alternative
    }
  )
}

// getOpenInstances([2,5,9],[[3,4],[9,15]]) => [2,5]
// Param 01: indices of target
// Param 02: Pairs of enclosing string indices.
// Result: All the comma indices outside the enclosing string indices.
function getOpenInstances(targetIndices, enclosingIndexPairs) {

  return targetIndices.filter(
    (num, idx, arr) => { // num = current comma Index

      let isNumValid = false;
      // Indices Loop
      for (let i = 0; i < enclosingIndexPairs.length - 1; i += 2) {

        if (
          num > enclosingIndexPairs[i][1]
          // ? if comma is greater than end of closing bracket Index 'AND'
          && num < enclosingIndexPairs[i + 1][0]
          // ? if comma is lesser than start of opening bracket Index 'OR'
          || num > enclosingIndexPairs[enclosingIndexPairs.length - 1][1]
          // ? if comma is after last bracket pair's end Index 'OR'
          || num < enclosingIndexPairs[0][0]
          // ? if comma is before first bracket pair's start index
        ) {
          isNumValid = true; // if any of the comma indices fails the condition, set isNumValid to false
        }

      }
      return isNumValid; // return true if the comma index is valid
    }
  )
}


