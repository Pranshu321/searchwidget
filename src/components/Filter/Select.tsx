import React,{ useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { TiTick } from 'react-icons/ti';

interface FiltersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface SelectProps {
  styles?: {
    container?: {};
    OptionNameStyle?: {};
    OptionStyle?: {};
    OptionDivStyle?: {};
    select?: {};
    OptionsItem?: {};
  };
  FiltersArray: Array<FiltersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
  options: Array<string>;
  optionName: string;
  filters?: Array<string>;
  Reset?: boolean;
  ArrayNumber: Array<number>;
  setArrayNumber: (...args: any[]) => any;
}

const size = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '2560px',
};

export const SelectDiv = styled.div<{ filterarray: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props: any) => (props?.filterarray ? '4px 4px' : '8px 8px')};
  border-radius: 15px;
  width: 15rem;
  /* max-width: max-content; */
  overflow-x: scroll;
   &::-webkit-scrollbar{
    display: none;
  }
  background-color: white;
  cursor: pointer;
  color: darkblue;
  @media (max-width: ${size.mobile}) {
    width: 10rem;
  }
`;

const OptionsDiv = styled.div`
  flex-direction: column;
  position: absolute;
  margin-top: 4px;
  min-width: 15rem;
  max-width: max-content;
  color: darkblue;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  max-height: 10rem;
  min-height: fit-content;
  border-radius: 10px;
  background: white;
  padding: 10px 10px;
  z-index: 999;
  @media (max-width: ${size.mobile}) {
    width: 10rem;
  }
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: darkblue;
  margin: 5px 5px;
`;

const OptionTextDiv = styled.div<{ selectedflag: boolean }>`
  background-color: ${(props: any) =>
    props?.selectedflag ? '#dddddd' : 'white'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 3px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const Select = ({
  options,
  styles,
  optionName,
  FiltersArray,
  setFiltersArray,
  Reset,
  ArrayNumber,
  setArrayNumber
}: SelectProps) => {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const FilterAdd = (option: string) => {
    setSelected([...selected, option]);
    if (selected.indexOf(option) !== -1) {
      const newarr = selected.filter(item => {
        return item !== option;
      });
      setSelected(newarr);
    }
  };
  // console.log("Check", FiltersSelectedArrayRef.current);

  // function checkIfPresent(option: string) {
  //     let val: boolean = false;
  //     FiltersArray?.map((item, idx) => {
  //         if (item.value.includes(option)) {
  //             NotIncludeFilterIndexAdd(idx);
  //             val = true;
  //         }
  //     });
  //     return val;
  // }

  // const NotIncludeFilterIndexAdd = (idx: number) => {
  //     SetNotIncludeFilter([...NotIncludeFilter, idx]);
  //     if (NotIncludeFilter.indexOf(idx) !== -1) {
  //         const newarr = NotIncludeFilter.filter(item => {
  //             return item !== idx;
  //         });
  //         // console.log("Yes");

  //         SetNotIncludeFilter(newarr);
  //     }
  // };

  const FiltersArrayAddition = (optionname: string, option: string) => {
    // FiltersArray?.map(item => {
    //     if (checkIfPresent(option)) {
    //         return FiltersArray;
    //     }
    //     if (checkIfPresent(optionName)) {
    //         console.log(optionName);
    //         const it = item;
    //         it.value = [...it.value, option];
    //         const temp = FiltersArray.filter(item => {
    //             item.name !== optionName;
    //         });
    //         setFiltersArray([...temp, it]);
    //     } else {
    //         setFiltersArray([
    //             ...FiltersArray,
    //             { name: optionName, value: [option] },
    //         ]);
    //     }
    //     return FiltersArray;
    // });
    // console.log(optionname, option);
    if (CheckIfOptionPresent(optionname)) {
      FiltersArray?.map(item => {
        if (CheckIfOptionPresent(optionname)) {
          if (item.value.includes(option)) {
            const newarr = item.value;
            const indexofOption = item.value.indexOf(option);
            newarr.splice(indexofOption, 1);
            item.value = newarr;
            return;
          }
          if (!(item.value.includes(option))) {
            let oldArr = item.value;
            oldArr.push(option);
            item.value = oldArr;
          }
        }
      });
    }
    else {
      setFiltersArray([...FiltersArray, { name: optionname, value: [option] }]);
    }
    setArrayNumber([...ArrayNumber, 2]);
  };

  function CheckIfOptionPresent(optionName: string) {
    let flag = false;
    FiltersArray?.map((item) => {
      if (item.name === optionName) {
        flag = true;
      }
    });
    return flag;
  }

  useEffect(() => {
    setSelected([]);
  }, [Reset]);

  // const CheckedORnot = (option: string) => {
  //   if (selected.indexOf(option) !== -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div>
      <div style={styles?.container}>
        <h4
          style={{
            color: '#000000',
            marginBottom: '5px',
            fontWeight: '600',
            fontSize: '19px',
            ...styles?.OptionNameStyle,
          }}
        >
          {optionName}
        </h4>
        <SelectDiv
          filterarray={selected.length !== 0}
          style={styles?.select}
          onClick={() => setshow(!show)}
        >
          {selected.length === 0
            ? 'Select'
            : selected.map((item, idx) => (
              <Text style={styles?.OptionStyle} key={idx + 1}>
                {item}
              </Text>
            ))}
        </SelectDiv>
        <div>
          <OptionsDiv
            style={{
              display: `${show ? 'flex' : 'none'}`,
              ...styles?.OptionDivStyle,
            }}
          >
            {options?.map((option, idx) => (
              <OptionTextDiv
                selectedflag={selected.indexOf(option) !== -1}
                key={idx + 1}
                onClick={() => {
                  FilterAdd(option);
                  FiltersArrayAddition(optionName, option);
                }}
              >
                <Text style={{ cursor: 'pointer', ...styles?.OptionsItem }}>
                  {option}
                </Text>
                {selected.indexOf(option) !== -1 && (
                  <TiTick color="green" size={25} />
                )}
              </OptionTextDiv>
            ))}
          </OptionsDiv>
        </div>
      </div>
    </div>
  );
};
