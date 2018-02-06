ちひろさんは天使。わかるね?

```tsx
import * as React from 'react';
import {compose, withHandlers} from 'recompose';
import {withControl} from 'senkawa-chihiro'

const enhancerA =
  withControl('message', null)
)

const ComponentA = enhancerA(({message})=> (
  <div>{message.body}</div>
))

const enhancerB = compose(
  withControl('message', null),
  withHandlers({
    onClick: props => event => {
      props.setGlobalState('message', {body: '今日のログインボーナスはこちらです!'})
    }
  })
)

const componentB = enhancerB(({messages, onClick})=> (
  <div>日付が変わりました<button onClick={onClick}>閉じる</button></div>
)
```
