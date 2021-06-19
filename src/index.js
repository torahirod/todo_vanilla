import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const text = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // 未完了リストに追加
  createIncompleteList(text);
};

const createIncompleteList = (text) => {
  // liタグ生成
  const li = document.createElement("li");

  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグ生成
  const p = document.createElement("p");
  p.classList.add("todo-str");
  p.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ（div）を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode.parentNode);

    const addTarget = completeButton.parentNode;
    // todo内容を取得
    const addTargetText = addTarget.firstElementChild.innerText;
    // div以下を初期化
    addTarget.textContent = null;

    // liタグ生成
    const li = document.createElement("li");

    // pタグ生成
    const p = document.createElement("p");
    p.classList.add("todo-str");
    p.innerText = addTargetText;

    // button(戻す)タグ生成
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    returnButton.addEventListener("click", () => {
      const deleteTarget = returnButton.parentNode.parentNode;
      text = returnButton.parentNode.firstElementChild.innerHTML;
      // 引数で渡されたタグを完了リストから削除
      document.getElementById("complete-list").removeChild(deleteTarget);
      // 未完了リストに追加
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    li.appendChild(addTarget);
    addTarget.appendChild(p);
    addTarget.appendChild(returnButton);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（div）を取得
    const deleteTarget = deleteButton.parentNode.parentNode;
    // 取得したタグを未完了リストから削除
    deleteFromIncompleteList(deleteTarget);
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

const deleteFromIncompleteList = (target) => {
  // 引数で渡されたタグを未完了リストから削除
  document.getElementById("incomplete-list").removeChild(target);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
