# 도트 아바타 (게임보이 스타일)

Profile 페이지의 인생 타임라인에 쓸 캐릭터와 장면 시안입니다. 모든 그림은 [preview.html](preview.html)의 코드로 그려지며, 사이트는 같은 그림 코드를 `src/app/profile/_components/pixel-journey/`로 옮겨 직접 그립니다. SVG·PNG는 저장해 두지 않으니, Figma 등에 필요할 때 아래 [다시 뽑기](#다시-뽑기)로 만드세요.

## 폴더 구성

| 경로 | 내용 | 크기 |
|---|---|---|
| `preview.html` | 장면을 페이드로 넘겨 보는 미리보기 (브라우저로 열기) | |
| `palettes.json` | 팔레트 4종의 색상값 | |
| `export.mjs` | `characters/`·`scenes/`에 SVG·PNG를 뽑는 스크립트 | |
| `export-canvas.mjs` | Claude Design 캔버스용 동작·장면 이미지를 뽑는 스크립트 | |
| `characters/` (뽑으면 생김) | 단계별 캐릭터 8종 (배경 투명) | 원본 22×26px, `@8x` 176×208px |
| `scenes/` (뽑으면 생김) | 단계별 장면 8컷 | 원본 160×144px, `@4x` 640×576px |

파일 이름의 번호와 단계는 다음과 같습니다.

| 번호 | 단계 | 번호 | 단계 |
|---|---|---|---|
| 01-high | 고등학교 졸업 | 05-discharge | 전역 |
| 02-univ | 대학교 진학 | 06-business | 사업 도전 |
| 03-grad | 대학교 졸업 | 07-bootcamp | 부트캠프 |
| 04-army | 입대 | 08-now | 지금의 나 |

## Figma로 가져오기

- **편집하려면 SVG**: 파일을 Figma 캔버스에 끌어다 놓으면 픽셀(한 줄씩 묶인 사각형)이 벡터로 들어옵니다. 같은 색 픽셀은 가로로 이어진 사각형 하나로 합쳐져 있습니다.
- **배치만 하려면 PNG**: `@8x`, `@4x` 파일을 쓰세요. 확대할 때 흐려지지 않도록 Figma 이미지 설정에서 크기 조절 방식을 **Nearest neighbor**로 두면 좋습니다.
- **색 바꾸기**: 모든 그림은 4가지 색만 씁니다. 그림을 선택한 뒤 오른쪽 패널의 **Selection colors**에서 4가지 색을 바꾸면 팔레트를 한 번에 바꿀 수 있습니다.
- **색상 스타일 등록**: 아래 표의 값을 Figma 색상 스타일로 등록해 두면 팔레트를 바꿔 끼우기 쉽습니다. 내보낸 파일은 기본 팔레트인 **선명한 그린**입니다.

| 팔레트 | 0 가장 어두움 | 1 | 2 | 3 가장 밝음 |
|---|---|---|---|---|
| 선명한 그린 (기본) | `#0b2613` | `#2f6a3b` | `#8dc455` | `#eaf7cc` |
| 클래식 그린 | `#0f380f` | `#306230` | `#8bac0f` | `#9bbc0f` |
| 포켓 그레이 | `#1a1a1c` | `#56565c` | `#a9a9b0` | `#eeeef0` |
| 세피아 | `#2a1a10` | `#76492a` | `#d59d63` | `#f8ebd2` |

## 다시 뽑기

`preview.html`의 그림 코드를 고친 뒤, 저장소 루트에서 다음을 실행하면 `characters/`, `scenes/`, `palettes.json`이 다시 만들어집니다.

```bash
node design/pixel-avatar/export.mjs design/pixel-avatar/preview.html design/pixel-avatar
```
