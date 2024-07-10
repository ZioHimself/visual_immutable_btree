export interface BTreeNode {
    id: string;
    keys: number[];
    children?: BTreeNode[];
    parent?: BTreeNode;
    isLeaf: boolean;
    version: number;
}

export interface BTreeVisualNode extends BTreeNode {
    x: number;
    y: number;
    isActive: boolean;
    children?: BTreeVisualNode[];
    parent?: BTreeVisualNode;
}

export interface BTree {
    root: BTreeVisualNode;
    version: number;
}

export class BTreeImpl implements BTree {
    root: BTreeVisualNode;
    version: number;

    constructor(root: BTreeVisualNode) {
        this.root = root;
        this.version = 1;
    }
}

export class BTreeVisualNodeImpl implements BTreeVisualNode {
    id: string;
    version: number;
    keys: number[];
    parent: BTreeVisualNode;
    children: BTreeVisualNode[];
    isActive: boolean;
    isLeaf: boolean;
    x: number;
    y: number;

    constructor(
        id: string,
        version: number,
        keys: number[],
        parent: BTreeVisualNode,
        children: BTreeVisualNode[],
        isActive: boolean,
        isLeaf: boolean) {
        this.children = children;
        this.id = id;
        this.isActive = isActive;
        this.isLeaf = isLeaf;
        this.keys = keys;
        this.parent = parent;
        this.version = version;
        this.x = 0; // Default value, will be set by D3
        this.y = 0; // Default value, will be set by D3
    }
}