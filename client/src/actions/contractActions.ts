import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { loginToLitNode } from "../components/litTest";
import { create } from "ipfs-http-client";
