---
name: worktree-cleanup
description: |
  워크트리 작업을 완료하고 병합 후 삭제하는 스킬. 다음 상황에서 자동 호출:
  - "워크트리 삭제", "worktree 삭제", "worktree remove", "워크트리 정리"
  - "워크트리 병합하고 삭제", "워크트리 작업 완료", "worktree 작업 끝"
  - "worktree cleanup", "보조 작업공간 삭제"
---

# Worktree Cleanup

워크트리(보조 작업 공간)에서 작업을 마치고 메인 브랜치에 병합한 뒤 워크트리를 삭제하는 스킬.

## Instructions

사용자가 삭제할 워크트리 이름(경로)을 제공하지 않으면, 먼저 아래 명령으로 목록을 확인한다:

```bash
git worktree list
```

워크트리 이름을 확인한 후 아래 5단계를 순서대로 실행한다.
`{worktree}`는 워크트리 폴더명(예: `msw`), `{branch}`는 워크트리 브랜치명으로 대체한다.

### Step 1 — 워크트리 폴더로 이동

```bash
cd ../{worktree}
```

### Step 2 — 작업 내용 커밋

커밋할 변경사항이 있는 경우 commit-helper 스킬의 규칙에 따라 커밋 메시지를 생성하고 커밋한다:

```bash
git add -A
git commit -m "{커밋 메시지}"
```

변경사항이 없으면 이 단계를 건너뛴다.

### Step 3 — 원래 폴더로 복귀

```bash
cd -
```

### Step 4 — 현재 브랜치에 워크트리 브랜치 병합

```bash
git merge {branch}
```

병합 충돌이 발생하면 사용자에게 알리고 수동 해결을 요청한다.

### Step 5 — 워크트리 삭제

```bash
git worktree remove ../{worktree}
```

삭제 후 정상적으로 제거되었는지 확인:

```bash
git worktree list
```

## Rules

- Step 2에서 커밋 메시지는 반드시 commit-helper 스킬의 태그(Feat, Fix, Refactor 등)와 한글 요약 형식을 따른다.
- 병합 전략은 기본 `merge`를 사용한다. `rebase`나 `squash`가 필요하면 사용자에게 확인한다.
- 워크트리 경로는 `../` 상대 경로로 처리한다 (메인 저장소와 형제 디렉터리 구조 가정).
- 삭제 전 반드시 커밋되지 않은 변경사항이 없는지 확인한다.
