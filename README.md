# 2024 ICT 프로젝트

이 프로젝트는 2024년 ICT 공모전을 위해 개발된 시스템으로, ROS2를 이용한 로봇 제어, 웹 기반의 모니터링 및 제어 인터페이스를 포함합니다.

## 📖 프로젝트 구조

이 프로젝트는 크게 두 가지 주요 구성 요소로 이루어져 있습니다.

- **`ROS2_WS/`**: ROS2(Robot Operating System 2) 워크스페이스로, 로봇의 주행을 담당합니다. 이 repository에는 포함되지 않습니다.
- **`WEB/`**: 사용자가 로봇을 모니터링하고 제어할 수 있는 웹 애플리케이션입니다. 웹 애플리케이션은 다시 세 부분으로 나뉩니다.
    - **`guard-back/`**: NestJS로 구현된 백엔드 서버입니다. 데이터베이스 관리, 사용자 인증, 그리고 웹소켓을 통해 프론트엔드 및 ROS2 시스템과 실시간으로 통신하는 역할을 합니다.
    - **`guard-front/`**: React로 구현된 메인 프론트엔드 애플리케이션입니다. 3D 지도 위에 로봇의 상태를 시각화하고, 각종 센서 데이터를 차트로 보여주며, 사용자에게 제어 인터페이스를 제공합니다.
    - **`test-robot/`**: React로 구현된 간단한 테스트용 웹 애플리케이션으로, 웹소켓 통신 등 특정 기능을 독립적으로 테스트하기 위해 사용됩니다.

## 🛠️ 기술 스택

- **백엔드 (Backend)**
  - Node.js
  - NestJS
  - TypeScript
  - TypeORM, MySQL
  - JWT (JSON Web Token)
  - Socket.IO

- **프론트엔드 (Frontend)**
  - React
  - JavaScript/TypeScript
  - Three.js, React Three Fiber (3D 렌더링)
  - MapboxGL (지도)
  - Chart.js (데이터 시각화)
  - Socket.IO Client

## ⚙️ 설치 및 실행 방법

각 구성 요소를 실행하기 위해 아래의 지침을 따르세요.

### 1. 백엔드 (guard-back)

```bash
# 1. 디렉토리로 이동
cd WEB/guard-back

# 2. 의존성 패키지 설치
npm install

# 3. 개발 모드로 서버 실행
# 서버는 http://localhost:3000 에서 실행됩니다.
npm run start:dev
```

### 2. 프론트엔드 (guard-front)

```bash
# 1. 디렉토리로 이동
cd WEB/guard-front

# 2. 의존성 패키지 설치
npm install

# 3. 개발 서버 실행
# 애플리케이션은 http://localhost:5022 에서 열립니다.
npm start
```



<img width="1624" height="1056" alt="IMG_7715" src="https://github.com/user-attachments/assets/9caabb1c-ae10-41a3-b654-72ec97c2044e" />
![IMG_7662](https://github.com/user-attachments/assets/bc66c88c-7369-4104-840f-0ce52f5671ef)
![IMG_7596](https://github.com/user-attachments/assets/498bb5c4-2dba-4ba3-8041-632f35c0191e)
