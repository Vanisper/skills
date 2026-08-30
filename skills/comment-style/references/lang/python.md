# Python

## 注释符号

- API 文档用 docstring（`"""..."""`），且必须是模块、类、函数体的**第一条语句**才生效（运行时挂到 `__doc__`）；`#` 只用于实现内的流程注释与行内注释。
- **惯例覆盖基线**：PEP 257 规定摘要行是句末带句号的整句（英文惯用祈使语气，如 "Return the sum..."）——不适用基线的「不以句号结尾」标点规则；中文项目的摘要行同样一句话定位，句号跟随 PEP 257 惯例。
- 多行 docstring 的结尾 `"""` 独占一行；单行 docstring 首尾引号同行。

## 风格三选一（项目内统一，不混用）

- **Google 风格**：`Args:` / `Returns:` / `Raises:` 小节，可读性最好，最常见
- **NumPy 风格**：`Parameters` + 下划线分隔线，科学计算生态惯用
- **reST（Sphinx）风格**：`:param x:` / `:returns:` 字段，经典 Sphinx 项目

类型信息以 type hints 为准，docstring 不重复类型；仅在无标注的存量代码中按所选风格补类型。

## 域模型移植性

- title 域 → 摘要行（PEP 257 的 summary line）
- description 域 → 空行后另起的段落
- signature 域 → `Args:` / `Returns:` / `Raises:`（或所选风格的对应小节）
- example 域 → `Examples:` 小节；doctest 格式（`>>>`）可被工具运行

## 示例（Google 风格）

```python
def distribute(total: int, items: list[Item]) -> list[int]:
    """按权重把 total 分配到 items。

    权重为 0 的项自动跳过；末项承担余量，保证总量守恒。

    Args:
        total: 待分配总量
        items: 目标项列表

    Returns:
        顺序与输入一致的分配结果

    Raises:
        ValueError: items 为空时
    """
```

## 常见坑

- docstring 写在装饰器与 `def` 之间、或函数体第一条语句之前的位置都无效——只有函数体第一条语句才是 docstring
- 摘要行与后续描述之间必须空一行（PEP 257），否则工具把多行折成摘要
- 三种风格的解析器不互通（Sphinx 需 napoleon 扩展才认 Google / NumPy 风格），换风格前先确认文档工具配置

## 规范依据

- PEP 257 Docstring Conventions：<https://peps.python.org/pep-0257/>（第一条语句、摘要句、结尾引号独行）
- Google Python Style Guide 3.8：<https://google.github.io/styleguide/pyguide.html#38-comments-and-docstrings>（Args/Returns/Raises 结构）
- NumPy docstring standard：<https://numpydoc.readthedocs.io/en/latest/format.html>
- 查证日期：2026-08
