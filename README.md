# javascript-tetris

<div flexDirection="column" align="center">

<img src="https://github.com/doongeon/javascript-tetris/assets/87890694/f6a8149a-0362-4c04-879d-04421b1f00dc" alt="스크린샷 2024-06-29 오후 1 59 27" width="400">

only css, js, html. Build with Vite.

Up Arrow: rotate, Arrow: move, Space Bar: drop,

[Click here to play](https://dogwjefyhsbjy.cloudfront.net)
</div>

## 프로젝트 구조
- **`index.html`**: 게임 캔버스가 포함된 HTML 파일.
- **`styles/`**: 게임의 css 파일이 있는 폴더.
- **`class/`**: 게임 로직을 구현하는 클래스 파일이 포함된 폴더.
- **`components/`**: html 컴포넌트를 랜더하는 파일이 있는 폴더.
- **`main.ts`**: 게임 초기화 파일.
- **`main.css`**: css 파일 취합.

## 주요 클래스

### TetrisBlock 클래스

#### 속성
- **`shape`**: `number[][]` (ex, [[0,1,0],[1,1,1],[0,0,0]])
- **`position`**: `type BlockPosition = { x: number; y: number }`, `shape[1][1]`의 `grid`에서의 위치.

#### 메서드
- **`move...()`**: 위치 조정.
- **`rotate()`**: 시계방향 회전.
- **`getDeepCopy()`**: 복사본 반환.
- **`getCells()`**: `shape`에서 값이 0이 아닌 엔트리의 `grid`에서의 위치.

### Grid 클래스

#### 속성

- **`grid`**: `number[][]`

#### 메서드

- **`drawBlock(tetrisBlock: TetrisBlock)`**: `tetrisBlock`을 `grid`에서 지움.
- **`eraseBlock(tetrisBlock: TetrisBlock)`**: `tetrisBlock`을 `grid`에 그림.
- **`clearRow()`**: 행이 꽉 찼을때 행을 지움, 해당하는 점수를 반환.
- **`isEmptyCell({ x, y }: { x: number; y: number })`**: 해당 셀이 비었는지 boolean 반환.
- **`getDeepCopy()`**: `grid`의 깊은 복사 반환.

### CollosionDetector 클래스

#### 메서드

- **`detectCollisionOn...(grid: Grid, tetrisBlock: TetrisBlock)`**: 해당 방향에 `tetrisBlock`을 그릴 수 있는지 boolean 반환.
- **`detectCollisionOnStart(grid: Grid, newTetrisBLock: TetrisBlock)`**: 새로운 `tetrisBlock`을 그릴 수 있는지 boolean 반환.
- **`checkCollision(cells: CellPosition[], mapCopy: Grid)`**: `grid`에 `cell`을 그릴 수 있는지 boolean 반환.

## 클래스 상호작용

- `Service`클래스에서 여러 클래스를 호출하여 새로운 라운드를 생성.
- `Game`클래스는 게임 상태 속성을 가지고 `Service`클래스 생성하여 게임 실행.
- `View`클래스는 로직 중간중간에 값이 업데이트 될 경우 HTML에 값 수정.


