# region help-files
FROM node:20.11.0-alpine AS help-files_common
WORKDIR /app

COPY helpers/purify-package-lock.js helpers/
COPY package.json package-lock.json ./
COPY packages/common/package.json packages/common/

RUN node helpers/purify-package-lock.js
RUN npm i --package-lock-only --ignore-scripts


FROM node:20.11.0-alpine AS help-files_landing
WORKDIR /app

COPY helpers/purify-package-lock.js helpers/
COPY package.json package-lock.json ./
COPY packages/common/package.json packages/common/
COPY packages/landing/package.json packages/landing/

RUN node helpers/purify-package-lock.js
RUN npm i --package-lock-only --ignore-scripts


FROM node:20.11.0-alpine AS help-files_ui
WORKDIR /app

COPY helpers/purify-package-lock.js helpers/
COPY package.json package-lock.json ./
COPY packages/common/package.json packages/common/
COPY packages/ui/package.json packages/ui/

RUN node helpers/purify-package-lock.js
RUN npm i --package-lock-only --ignore-scripts


FROM node:20.11.0-alpine AS help-files_planner
WORKDIR /app

COPY helpers/purify-package-lock.js helpers/
COPY package.json package-lock.json ./
COPY packages/common/package.json packages/common/
COPY packages/ui/package.json packages/ui/
COPY packages/planner/package.json packages/planner/

RUN node helpers/purify-package-lock.js
RUN npm i --package-lock-only --ignore-scripts


FROM node:20.11.0-alpine AS help-files_floor-plan-scanner
WORKDIR /app

COPY helpers/purify-package-lock.js helpers/
COPY package.json package-lock.json ./
COPY packages/common/package.json packages/common/
COPY packages/floor-plan-scanner/package.json packages/floor-plan-scanner/

RUN node helpers/purify-package-lock.js
RUN npm i --package-lock-only --ignore-scripts


FROM node:20.11.0-alpine AS help-files_package-jsons
WORKDIR /app

COPY helpers/make-docker-package-jsons.js helpers/
COPY package.json ./
COPY packages/common/package.json packages/common/
COPY packages/ui/package.json packages/ui/
COPY packages/planner/package.json packages/planner/
COPY packages/landing/package.json packages/landing/
COPY packages/floor-plan-scanner/package.json packages/floor-plan-scanner/

RUN node helpers/make-docker-package-jsons.js


FROM scratch as help-files

COPY --from=help-files_common /app/package-lock.json /app/package-lock-common.json
COPY --from=help-files_landing /app/package-lock.json /app/package-lock-landing.json
COPY --from=help-files_ui /app/package-lock.json /app/package-lock-ui.json
COPY --from=help-files_planner /app/package-lock.json /app/package-lock-planner.json
COPY --from=help-files_floor-plan-scanner /app/package-lock.json /app/package-lock-floor-plan-scanner.json

COPY --from=help-files_package-jsons /app/docker-*package.json /app/
COPY --from=help-files_package-jsons /app/packages/common/docker-*package.json /app/packages/common/
COPY --from=help-files_package-jsons /app/packages/ui/docker-*package.json /app/packages/ui/
COPY --from=help-files_package-jsons /app/packages/planner/docker-*package.json /app/packages/planner/
COPY --from=help-files_package-jsons /app/packages/landing/docker-*package.json /app/packages/landing/
COPY --from=help-files_package-jsons /app/packages/floor-plan-scanner/docker-*package.json /app/packages/floor-plan-scanner/
# endregion


FROM node:20.11.0-alpine AS common
WORKDIR /app

COPY --from=help-files /app/package-lock-common.json ./package-lock.json
COPY --from=help-files /app/docker-package.json package.json
COPY --from=help-files /app/packages/common/docker-package.json packages/common/package.json

COPY helpers/start-checks.js helpers/check-package-versions.js helpers/create-eslint-rules-custom.js helpers/
COPY helpers/modify-node-modules helpers/modify-node-modules
COPY .nvmrc .

RUN npm ci

COPY packages/common/src packages/common/src
COPY packages/common/tsconfig.base.json packages/common/tsconfig.json packages/common/
COPY --from=help-files /app/docker-build-package.json package.json
COPY --from=help-files /app/packages/common/docker-build-package.json packages/common/package.json

RUN npm run common:build


FROM node:20.11.0-alpine AS ui
WORKDIR /app

COPY --from=help-files /app/package-lock-ui.json ./package-lock.json
COPY --from=help-files /app/docker-package.json package.json
COPY --from=help-files /app/packages/common/docker-package.json packages/common/package.json
COPY --from=help-files /app/packages/ui/docker-package.json packages/ui/package.json

COPY helpers/start-checks.js helpers/check-package-versions.js helpers/create-eslint-rules-custom.js helpers/
COPY helpers/modify-node-modules helpers/modify-node-modules
COPY .nvmrc .

RUN npm ci

COPY packages/common/tsconfig.base.json packages/common
COPY --from=common /app/packages/common/dist packages/common/dist
COPY packages/ui packages/ui
COPY --from=help-files /app/docker-build-package.json package.json
COPY --from=help-files /app/packages/ui/docker-build-package.json packages/ui/package.json


FROM ui AS ui-lib
RUN npm run ui:build:lib


FROM ui AS ui-preview-page
COPY .env ./
RUN npm run ui:build:previewPage


FROM node:20.11.0-alpine AS planner
WORKDIR /app

COPY --from=help-files /app/package-lock-planner.json ./package-lock.json
COPY --from=help-files /app/docker-package.json package.json
COPY --from=help-files /app/packages/common/docker-package.json packages/common/package.json
COPY --from=help-files /app/packages/ui/docker-package.json packages/ui/package.json
COPY --from=help-files /app/packages/planner/docker-package.json packages/planner/package.json

COPY helpers/start-checks.js helpers/check-package-versions.js helpers/create-eslint-rules-custom.js helpers/
COPY helpers/modify-node-modules helpers/modify-node-modules
COPY .nvmrc .

RUN npm ci

COPY packages/common/tsconfig.base.json packages/common
COPY --from=common /app/packages/common/dist packages/common/dist
COPY --from=ui-lib /app/packages/ui/dist packages/ui/dist
COPY packages/planner packages/planner
COPY --from=help-files /app/docker-build-package.json package.json
COPY --from=help-files /app/packages/planner/docker-build-package.json packages/planner/package.json

COPY .env ./
RUN npm run planner:build


FROM node:20.11.0-alpine AS landing-page
WORKDIR /app

COPY --from=help-files /app/package-lock-landing.json ./package-lock.json
COPY --from=help-files /app/docker-package.json package.json
COPY --from=help-files /app/packages/common/docker-package.json packages/common/package.json
COPY --from=help-files /app/packages/landing/docker-package.json packages/landing/package.json

COPY helpers/start-checks.js helpers/check-package-versions.js helpers/create-eslint-rules-custom.js helpers/
COPY helpers/modify-node-modules helpers/modify-node-modules
COPY .nvmrc .

RUN npm ci

COPY packages/common/tsconfig.base.json packages/common
COPY --from=common /app/packages/common/dist packages/common/dist
COPY packages/landing/src packages/landing/src
COPY packages/landing/public packages/landing/public
COPY packages/landing/next.config.js packages/landing/tsconfig.json packages/landing/
COPY --from=help-files /app/docker-build-package.json package.json
COPY --from=help-files /app/packages/landing/docker-build-package.json packages/landing/package.json

COPY .env ./
RUN npm run landing:build


FROM node:20.11.0-slim AS floor-plan-scanner
WORKDIR /app

RUN apt update && apt install -y --no-install-recommends python3 python3-pip python3-venv libgl1 libglib2.0-0 && apt clean && rm -rf /var/lib/apt/lists/*
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"
COPY packages/floor-plan-scanner/requirements.txt packages/floor-plan-scanner/
RUN pip install --no-cache-dir -r packages/floor-plan-scanner/requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu && \
  find /venv -type d -name "__pycache__" -exec rm -rf {} +

COPY --from=help-files /app/package-lock-floor-plan-scanner.json ./package-lock.json
COPY --from=help-files /app/docker-package.json package.json
COPY --from=help-files /app/packages/common/docker-package.json packages/common/package.json
COPY --from=help-files /app/packages/floor-plan-scanner/docker-package.json packages/floor-plan-scanner/package.json

COPY helpers/start-checks.js helpers/check-package-versions.js helpers/create-eslint-rules-custom.js helpers/
COPY helpers/modify-node-modules helpers/modify-node-modules
COPY .nvmrc .

RUN npm ci

COPY packages/common/tsconfig.base.json packages/common
COPY --from=common /app/packages/common/dist packages/common/dist
COPY packages/floor-plan-scanner/src packages/floor-plan-scanner/src
COPY packages/floor-plan-scanner/core packages/floor-plan-scanner/core
COPY packages/floor-plan-scanner/models packages/floor-plan-scanner/models
COPY packages/floor-plan-scanner/classification packages/floor-plan-scanner/classification
COPY \
  packages/floor-plan-scanner/analyze_low_thresholds.py \
  packages/floor-plan-scanner/inference_log.py \
  packages/floor-plan-scanner/opening_matcher.py \
  packages/floor-plan-scanner/test_inference.py \
  packages/floor-plan-scanner/test_threshold_system.py \
  packages/floor-plan-scanner/timing_estimator.py \
  packages/floor-plan-scanner/tsconfig.json \
  packages/floor-plan-scanner/
COPY --from=help-files /app/docker-build-package.json package.json
COPY --from=help-files /app/packages/floor-plan-scanner/docker-build-package.json packages/floor-plan-scanner/package.json

RUN npm run floor-plan-scanner:build


FROM busybox:stable AS static-files
WORKDIR /app

COPY --from=planner /app/packages/planner/dist planner
COPY --from=ui-preview-page /app/packages/ui/preview-dist ui
COPY packages/planner/src/robots.txt planner-robots.txt
COPY packages/ui/src/robots.txt ui-robots.txt

ARG DEPLOY_ENV
RUN if [ "$DEPLOY_ENV" = "production" ]; then \
  rm -rf planner-robots.txt ui-robots.txt; \
  else \
  mv planner-robots.txt planner/robots.txt; \
  mv ui-robots.txt ui/robots.txt; \
  fi
