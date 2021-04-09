# React Chat Fwork

## Installation

```
$ npm install git+ssh://git@118.68.218.91:fpt.work/header/header.git
```

## Example

``` javascript
import React, {Component} from 'react'
import {HeaderCustom} from '@fwork/header-custom'

class Fwork extends Component {

  constructor() {
    super();
  }

  render() {
    return (<div>
      <HeaderCustom/>
    </div>)
  }
}
```

## .ENV
``` javascript
FWORK_DEVELOPER_API_ENDPOINT='https://dev.developer.fpt.work/api/v1'
REACT_APP_FWORK_API_ENDPOINT='https://dev.fpt.work/api/v1'
PORT=3003
```
