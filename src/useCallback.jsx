import React, { useCallback, useState } from "react";

const Child = React.memo(({ hello }) => {
    console.log('child called');

    return (
        <button onClick={hello}>Child</button>
    )
});


const Parent = () => {
    const [count, setCount] = useState(0);

    useCallback(function display() {
        console.log('Hello')
    }, [])


    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>

            <Child hello={display} />
        </>
    )
}

// The thing is that the child recieves the display function , all good.
/* 
    SO when we click the count button , the count changes and it triggers the whole component
    to rerender so Child component too rerenders , but count state isnt even related to Child , right??

    So in this case we use useCallback which checks whether the  function of child component too changes 
    If no , then Parent only renders again whereas child stays as is 

    Now we have React.memo on the child , what it does is checks whether the props (here a function in props)
    is unchanged , if yes then skips rerender

    But on parent rerender fn dusplay()->0x211 then after again rerender fn display()-<0x155 , now 
    memo sees different references so rerenders child again , even though display has nothing to do with
    the setCount , here comes useCallback()
    
    Re-render#1
    Count changes 
    Function display() ->0x211
    Child too renders again

    Re-render#2
    Count changes
    Function display()->0x155
    Child.memo sees 0x211 !== 0x155 rerenders again though unnessary
*/

/* 
  What useCallback does is it memoizes the function of Parent which is gonna be passed to child
  And on Rerender if any deps are not changed of that function then its reference doesnt change

  This is then passed to child where Memo sees the prev and current function ref is same
  so skips child rerender

  #Re-render1
  parent rerenders
  Function display()->0x211
  Child rerenders 

  #Re-render2
  Function display()'s deps ie the callback its wrapped in is the same
  so same reference
  Child gets 0x211

  Memo of child says i got a 0x211 ref before and now too
  0x211 === 0x211

  Skip child rerender
*/

